exports.up = knex => knex.schema.createTable("products", table => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    
    table.text("title").notNullable();
    table.integer("price_in_cents").notNullable();
    table.text("description").notNullable();
    table.enum("category", ["food", "drink", "dessert"]).notNullable();
    table.text("image");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

});


exports.down = knex => knex.schema.dropTable("products");