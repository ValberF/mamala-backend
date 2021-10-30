const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const postnatal = await knex("postnatal").select("*");
      return res.status(200).json(postnatal);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este pós-natal não existe!", statusCode: 400});

      const getIdPostnatal = await knex("postnatal").where({ postnatal_id: req.params.id }).first();
      if(!getIdPostnatal)
        return res.status(400).json({message: "Este pós-natal não existe ou não foi encontrado", statusCode: 400});

      return res.status(200).json(getIdPostnatal);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este pós-natal não existe!", statusCode: 400});

      const rowsDeleted = await knex("postnatal").del().where({ postnatal_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Este pós-natal não existe ou não foi encontrado", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    try {
        const insertPostnatal = await knex("postnatal").insert(req.body);
        return res.status(201).json({ message: "Novo pós-natal cadastrado", postnatal: insertPostnatal })
    } catch (msg) {
        return res.status(500).json({ message: msg, statusCode: 500 });
    }    
  };

  return { get, getById, post, remove };  
};
