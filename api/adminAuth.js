require("dotenv").config()
const authSecret = process.env.authSecret;
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const knex = require("../config/db");

module.exports = app => {
  const signIn = async (req, res) => {
    if(!req.body.admin_email || !req.body.admin_password)
      return res.status(400).json({message: "Email e senha devem ser preenchidos", statusCode: 400});

    const admin = await knex("admin").where({ admin_email: req.body.admin_email }).first();
    if(!admin)
      return res.status(400).json({message: "Este administrador não existe ou não foi encontrado", statusCode: 400});

    const isMatch = bcrypt.compareSync(req.body.admin_password, admin.admin_password);
    if(!isMatch)
      return res.status(401).json({message: "Senha inválida!", statusCode: 401});

    const now = Date.now();
    payload = {
      ...admin,
      iat: now,
      exp: now + 1000 * 60 * 60 * 24,
    };

    const {
        admin_id,
        admin_name,
        admin_email,
        admin_token
    } = admin

    return res.json({  
        admin_id,
        admin_name,
        admin_email,
        admin_token,
        token: jwt.encode(payload, authSecret)});
  }; 

  return { signIn };
};
