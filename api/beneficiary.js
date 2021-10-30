const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const beneficiary = await knex("beneficiary").select("*");
      return res.status(200).json(beneficiary);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const getById = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Esta beneficiaria não existe!", statusCode: 400});

      const getIdBeneficiary = await knex("beneficiary").where({ beneficiary_id: req.params.id }).first();
      if(!getIdBeneficiary)
        return res.status(400).json({message: "Esta beneficiaria não existe ou não foi encontrada", statusCode: 400});

      return res.status(200).json(getIdBeneficiary);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const remove = async (req, res) => {
    try {
      if(!req.params.id)
        return res.status(400).json({message: "Esta beneficiaria não existe!", statusCode: 400});

      const rowsDeleted = await knex("beneficiary").del().where({ beneficiary_id: req.params.id });
      if(!rowsDeleted)
        return res.status(400).json({message: "Esta beneficiaria não existe ou não foi encontrada", statusCode: 400});

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  const post = async (req, res) => {
    try {
        const insertBeneficiary = await knex("beneficiary").insert(req.body);
        return res.status(201).json({ message: "Nova beneficiaria cadastrada", beneficiary: insertBeneficiary })
    } catch (msg) {
        return res.status(500).json({ message: msg, statusCode: 500 });
    }    
  };

  const put = async (req, res) => {
    const beneficiary_id = req.params.id;

    if(!beneficiary_id)
      return res.status(400).json({message: "Este beneficiaria não existe!", statusCode: 400});

    try {
      finalBeneficiary = await knex("beneficiary").update(req.body).where({ beneficiary_id });
      if(!finalBeneficiary)
        return res.status(400).json({message: "Este beneficiaria não existe ou não foi encontrada", statusCode: 400});

      return res.status(200).send({message: 'Beneficiaria atualizada', finalBeneficiary});
    } catch (err) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  };

  return { get, getById, post, remove, put };  
};
