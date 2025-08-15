exports.up = (knex) => {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .enum("status", ["pending", "preparing", "delivered"])
      .notNullable()
      .defaultTo("pending");
    table.decimal("total_price", 10, 2);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("orders");
};
