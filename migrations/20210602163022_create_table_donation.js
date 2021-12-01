exports.up = function (knex) {
  return knex.schema.createTable("donation", (table) => {
    table.increments("donation_id").primary();
    table.integer("donor_id").unsigned().nullable();
    table.foreign("donor_id").references("donor_id").inTable("donor").onDelete("CASCADE");
    table.integer("donation_amount").notNull();
    table.date("donation_date").notNull();
    table.string("donation_status").notNull();
  });
}; 
    
exports.down = function (knex) {
  return knex.schema.dropTable("donation");
};