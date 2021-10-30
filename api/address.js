const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const address = await knex("address").select("*");
      return res.status(200).json(address);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este endereço não existe!", statusCode: 400});

      const getIdAddress = await knex("address").where({ address_id: req.params.id }).first();
      if(!getIdAddress)
        return res.status(400).json({message: "Este endereço não existe ou não foi encontrado", statusCode: 400});

      return res.status(200).json(getIdAddress);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Este endereço não existe!", statusCode: 400});

      const rowsDeleted = await knex("address").del().where({ address_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Este endereço não existe ou não foi encontrado", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    try {
        const insertAddress = await knex("address").insert(req.body);
        return res.status(201).json({ message: "Novo endereço cadastrado", address: insertAddress })
    } catch (msg) {
        return res.status(500).json({ message: msg, statusCode: 500 });
    }    
  };

  return { get, getById, post, remove };  
};
