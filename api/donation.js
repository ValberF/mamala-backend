const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const donation = await knex("donation").select("*");
      return res.status(200).json(donation);
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const getById = async (req, res) => {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Esta doação não existe!", statusCode: 400 });

      const getIdDonation = await knex("donation").where({ donation_id: req.params.id }).first();
      if (!getIdDonation)
        return res.status(400).json({ message: "Esta doação não existe ou não foi encontrada", statusCode: 400 });

      return res.status(200).json(getIdDonation);
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const remove = async (req, res) => {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Esta doação não existe!", statusCode: 400 });

      const rowsDeleted = await knex("donation").del().where({ donation_id: req.params.id });
      if (!rowsDeleted)
        return res.status(400).json({ message: "Esta doação não existe ou não foi encontrada", statusCode: 400 });

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const post = async (req, res) => {
    try {
      const { donation_amount, donation_date, donor_id, donation_status } = req.body
      const insertdonation = await knex("donation").insert({
        donation_status,
        donation_amount,
        donation_date,
        donor_id
      });
      return res.status(201).json({ message: "Nova doação cadastrada", donation: insertdonation })
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const put = async (req, res) => {
    const stock_id = req.params.id;

    if (!stock_id)
      return res.status(400).json({ message: "doação não existe!", statusCode: 400 });

    try {
      finalstock = await knex("stock").update(req.body).where({ stock_id });
      if (!finalstock)
        return res.status(400).json({ message: "doação não existe ou não foi encontrada", statusCode: 400 });

      return res.status(200).send({ message: 'doação atualizada', finalstock });
    } catch (err) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  return { get, getById, post, remove, put };
};
