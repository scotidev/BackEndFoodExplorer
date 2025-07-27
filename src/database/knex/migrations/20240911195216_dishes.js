exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");

    table.text("title").notNullable();
    table.text("description").notNullable();
    table.enum("category", ["food", "drink", "dessert"]).notNullable();
    table.decimal("price", 14, 2).notNullable();
    table.text("image");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
