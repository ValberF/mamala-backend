const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const donor = await knex("donor").select("*");
      return res.status(200).json(donor);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Esta doadora não existe!", statusCode: 400});

      const getIdDonor = await knex("donor").where({ donor_id: req.params.id }).first();
      if(!getIdDonor)
        return res.status(400).json({message: "Esta doadora não existe ou não foi encontrada", statusCode: 400});

      return res.status(200).json(getIdDonor);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Esta doadora não existe!", statusCode: 400});

      const rowsDeleted = await knex("donor").del().where({ donor_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Esta doadora não existe ou não foi encontrada", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    try {
        const insertDonor = await knex("donor").insert(req.body);
        return res.status(201).json({ message: "Nova doadora cadastrada", donor: insertDonor })
    } catch (msg) {
        return res.status(500).json({ message: msg, statusCode: 500 });
    }    
  };

  const put = async (req, res) => {
    const donor_id = req.params.id;

    if(!donor_id)
      return res.status(400).json({message: "Esta doadora não existe!", statusCode: 400});

    try {
      finalDonor = await knex("donor").update(req.body).where({ donor_id });
      if(!finalDonor)
        return res.status(400).json({message: "Esta doadora não existe ou não foi encontrada", statusCode: 400});

      return res.status(200).send({message: 'Doadora atualizada', finalDonor});
    } catch (err) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  return { get, getById, post, remove, put };  
};
