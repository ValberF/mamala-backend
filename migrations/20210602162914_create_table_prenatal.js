exports.up = function (knex) {
  return knex.schema.createTable("prenatal", (table) => {
    table.increments("prenatal_id").primary();
    table.integer("donor_id").unsigned().notNull();
    table.foreign("donor_id").references("donor_id").inTable("donor").onDelete("CASCADE");
    table.string("prenatal_exam").nullable();
    table.string("prenatal_medication").nullable();
    table.string("prenatal_toxic").nullable();
    table.string("prenatal_disease").nullable();
  });
};
    
exports.down = function (knex) {
  return knex.schema.dropTable("prenatal");
};