exports.up = function (knex) {
  return knex.schema.createTable("obstetrician", (table) => {
    table.increments("obstetrician_id").primary();
    table.string("obstetrician_name").notNull();
    table.string("obstetrician_phoneNumber").notNull();
  });
};
    
exports.down = function (knex) {
  return knex.schema.dropTable("obstetrician");
};