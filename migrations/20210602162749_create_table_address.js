exports.up = function (knex) {
  return knex.schema.createTable("address", (table) => {
    table.increments("address_id").primary();
    table.string("address_street").notNull();
    table.string("address_district").nullable();
    table.string("address_reference").notNull();
    table.string("address_number").notNull();
  });
};
    
exports.down = function (knex) {
  return knex.schema.dropTable("address");
};