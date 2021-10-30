const knex = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = app => {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const get = async (req, res) => {
    try {
      const admin = await knex("admin").select("*");
      return res.json(admin);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este administrador não existe!", statusCode: 400});

      const getIdadmin = await knex("admin")
        .where({ admin_id: req.params.id })
        .first();
      if(!getIdadmin)
        return res.status(400).json({message: "Este administrador não existe ou não foi encontrado", statusCode: 400});

      return res.status(200).json(getIdadmin);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este administrador não existe!", statusCode: 400});

      const rowsDeleted = await knex("admin").del().where({ admin_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Este administrador não existe ou não foi encontrado", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    let {
      admin_name,
      admin_email,
      admin_password,
    } = req.body;
    try {
      if(!admin_email || !admin_password)
        return res.status(400).json({message: "Email e senha devem ser preenchidos", statusCode: 400});

      const adminFromDB = await knex("admin").where({ admin_email: admin_email }).first();
      if(adminFromDB)
        return res.status(400).json({message: "Este administrador já está cadastrado", statusCode: 400})

      const finaladmin = await knex("admin").insert({
        admin_name,
        admin_email,
        admin_password: encryptPassword(admin_password)
      });
      
      return res.status(201).json({ message: "Novo administrador cadastrado", admin: finaladmin })
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }    
  };

  return { get, getById, post, remove };
};
