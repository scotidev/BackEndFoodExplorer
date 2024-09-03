exports.up = knex => knex.schema.createTable("users", table => {
  table.uuid('id').defaultTo(knex.fn.uuid()).primary();
  table.text("name").notNullable();
  table.text("email").notNullable().unique();
  table.text("password").notNullable();
  table.boolean("isAdmin").notNullable().defaultTo(false);
  table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("users");