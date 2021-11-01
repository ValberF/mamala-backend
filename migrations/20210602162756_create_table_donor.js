exports.up = function (knex) {
  return knex.schema.createTable("donor", (table) => {
    table.increments("donor_id").primary();
    table.integer("address_id").unsigned().notNull();
    table.foreign("address_id").references("address_id").inTable("address").onDelete("CASCADE");
    table.integer("admin_id").unsigned().notNull();
    table.foreign("admin_id").references("admin_id").inTable("admin").onDelete("CASCADE");
    table.string("donor_name").notNull();
    table.string("donor_naturalness").nullable();
    table.string("donor_phoneNumber").notNull();
    table.string("donor_grandmother").notNull();
  });
};
    
exports.down = function (knex) {
  return knex.schema.dropTable("donor");
};