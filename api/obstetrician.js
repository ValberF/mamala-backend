const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const obstetrician = await knex("obstetrician").select("*");
      return res.status(200).json(obstetrician);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este obstetra não existe!", statusCode: 400});

      const getIdObstetrician = await knex("obstetrician").where({ obstetrician_id: req.params.id }).first();
      if(!getIdObstetrician)
        return res.status(400).json({message: "Este obstetra não existe ou não foi encontrado", statusCode: 400});

      return res.status(200).json(getIdObstetrician);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este obstetra não existe!", statusCode: 400});

      const rowsDeleted = await knex("obstetrician").del().where({ obstetrician_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Este obstetra não existe ou não foi encontrado", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    try {
        const insertObstetrician = await knex("obstetrician").insert(req.body);
        return res.status(201).json({ message: "Novo obstetra cadastrado", obstetrician: insertObstetrician })
    } catch (msg) {
        return res.status(500).json({ message: msg, statusCode: 500 });
    }    
  };

  return { get, getById, post, remove };  
};
