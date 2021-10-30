exports.up = function (knex) {
  return knex.schema.createTable("beneficiary", (table) => {
    table.increments("beneficiary_id").primary();
    table.integer("address_id").unsigned().notNull();
    table.foreign("address_id").references("address_id").inTable("address").onDelete("CASCADE");
    table.string("beneficiary_name").notNull();
    table.string("beneficiary_phoneNumber").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("beneficiary");
};