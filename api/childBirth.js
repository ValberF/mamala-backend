const knex = require("../config/db");

module.exports = app => {
  const get = async (req, res) => {
    try {
      const childBirth = await knex("prenatal").select("*")
                        .innerJoin("postnatal", "prenatal.prenatal_id", "postnatal.prenatal_id")
                        .innerJoin("obstetrician", "obstetrician.obstetrician_id", "postnatal.obstetrician_id")
                        .where({'prenatal.donor_id': req.params.id});    
      
      
      return res.json(childBirth);
    } catch (msg) {
      return res.status(500).json({message: msg, statusCode: 500});
    }
  }

  return { get }
}