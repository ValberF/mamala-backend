const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const prenatal = await knex("prenatal").select("*");
      return res.status(200).json(prenatal);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este pré-natal não existe!", statusCode: 400});

      const getIdPrenatal = await knex("prenatal").where({ prenatal_id: req.params.id }).first();
      if(!getIdPrenatal)
        return res.status(400).json({message: "Este pré-natal não existe ou não foi encontrado", statusCode: 400});

      return res.status(200).json(getIdPrenatal);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este pré-natal não existe!", statusCode: 400});

      const rowsDeleted = await knex("prenatal").del().where({ prenatal_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Este pré-natal não existe ou não foi encontrado", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    try {
        const insertPrenatal = await knex("prenatal").insert(req.body);
        return res.status(201).json({ message: "Novo pré-natal cadastrado", prenatal: insertPrenatal })
    } catch (msg) {
        return res.status(500).json({ message: msg, statusCode: 500 });
    }    
  };

  return { get, getById, post, remove };  
};
