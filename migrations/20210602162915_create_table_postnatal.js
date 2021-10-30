exports.up = function (knex) {
  return knex.schema.createTable("postnatal", (table) => {
    table.increments("postnatal_id").primary();
    table.integer("donor_id").unsigned().notNull();
    table.foreign("donor_id").references("donor_id").inTable("donor").onDelete("CASCADE");
    table.integer("prenatal_id").unsigned().nullable();
    table.foreign("prenatal_id").references("prenatal_id").inTable("prenatal").onDelete("CASCADE");
    table.integer("obstetrician_id").unsigned().nullable();
    table.foreign("obstetrician_id").references("obstetrician_id").inTable("obstetrician").onDelete("CASCADE");
    table.boolean("postnatal_typeBirth").notNull();
    table.string("postnatal_medication").nullable();
    table.string("postnatal_toxic").nullable();
    table.string("postnatal_disease").nullable();
    table.string("postnatal_local").nullable();
    table.date("postnatal_birthDate").notNull();
  });
};
    
exports.down = function (knex) {
  return knex.schema.dropTable("postnatal");
};