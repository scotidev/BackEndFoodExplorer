
exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary()

    table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE")
    
    table.text("name").notNullable()
})

exports.down = knex => knex.schema.dropTable("ingredients")
