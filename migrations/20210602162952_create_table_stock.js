exports.up = function (knex) {
  return knex.schema.createTable("stock", (table) => {
    table.increments("stock_id").primary();
    table.integer("beneficiary_id").unsigned().nullable();
    table.foreign("beneficiary_id").references("beneficiary_id").inTable("beneficiary").onDelete("CASCADE");
    table.integer("stock_amount").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("stock");
};