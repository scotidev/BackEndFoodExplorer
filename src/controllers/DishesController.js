const knex = require("../database/knex");

class DishesController {
  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.status(200).json({
      ...dish,
      ingredients,
    });
  }

  async index(request, response) {
    const { title } = request.query;

    let dishes;

    const searchTitleLower = title ? title.toLowerCase() : "";

    if (title) {
      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
          "dishes.created_at",
          "dishes.updated_at",
        ])
        .innerJoin("ingredients", "dishes.id", "ingredients.dish_id")
        .whereRaw("LOWER(dishes.title) LIKE ?", [`%${searchTitleLower}%`]) // Busca por título (case-insensitive)
        .orWhereRaw("LOWER(ingredients.name) LIKE ?", [`%${searchTitleLower}%`]) // busca por nome do ingrediente (case-insensitive)
        .groupBy("dishes.id") // Agrupa para evitar duplicatas de pratos que têm múltiplos ingredientes correspondentes
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes").orderBy("title");
    }

    const dishesWithIngredients = await Promise.all(
      dishes.map(async (dish) => {
        const ingredients = await knex("ingredients")
          .where({ dish_id: dish.id })
          .orderBy("name");
        return {
          ...dish,
          ingredients,
        };
      })
    );

    return response.json(dishesWithIngredients);
  }
}

module.exports = DishesController;
