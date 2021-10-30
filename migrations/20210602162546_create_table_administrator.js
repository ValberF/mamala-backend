exports.up = function (knex) {
  return knex.schema.createTable("admin", (table) => {
    table.increments("admin_id").primary();
    table.string("admin_name").notNull();
    table.string("admin_email").nullable();
    table.string("admin_password").notNull();
    table.string("admin_token").nullable();
    table.string("admin_expiresToken").nullable();  
  });
};
    
exports.down = function (knex) {
  return knex.schema.dropTable("admin");
};