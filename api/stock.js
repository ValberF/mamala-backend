const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const stock = await knex("stock").select("*");
      return res.status(200).json(stock);
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const getById = async (req, res) => {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "estoque não existe!", statusCode: 400 });

      const getIdstock = await knex("stock").where({ stock_id: req.params.id }).first();
      if (!getIdstock)
        return res.status(400).json({ message: "estoque não existe ou não foi encontrado", statusCode: 400 });

      return res.status(200).json(getIdstock);
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const remove = async (req, res) => {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "estoque não existe!", statusCode: 400 });

      const rowsDeleted = await knex("stock").del().where({ stock_id: req.params.id });
      if (!rowsDeleted)
        return res.status(400).json({ message: "estoque não existe ou não foi encontrado", statusCode: 400 });

      return res.status(204).send();
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const post = async (req, res) => {
    try {
      const insertstock = await knex("stock").insert(req.body);
      return res.status(201).json({ message: "Novo estoque cadastrado", stock: insertstock })
    } catch (msg) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  const put = async (req, res) => {
    const stock_id = req.params.id;

    if (!stock_id)
      return res.status(400).json({ message: "estoque não existe!", statusCode: 400 });

    try {
      finalstock = await knex("stock").update(req.body).where({ stock_id });
      if (!finalstock)
        return res.status(400).json({ message: "estoque não existe ou não foi encontrado", statusCode: 400 });

      return res.status(200).send({ message: 'estoque atualizado', finalstock });
    } catch (err) {
      return res.status(500).json({ message: msg, statusCode: 500 });
    }
  };

  return { get, getById, post, remove, put };
};
