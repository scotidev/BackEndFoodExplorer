const knex = require("../database/knex");

class DishesController {
    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

        return response.status(200).json({
            ...dish,
            ingredients
        });
    }

    async index(request, response) {
        const { title } = request.query;

        let dishes;

        if (title) {
            dishes = await knex("dishes")
                .whereLike("title", `%${title}%`)
                .orderBy("title");

            if (dishes.length === 0) {
                dishes = await knex("ingredients")
                    .select("dishes.*")
                    .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
                    .whereLike("ingredients.name", `%${title}%`)
                    .orderBy("dishes.title")
                    .groupBy("dishes.id");
            }
        } else {
            dishes = await knex("dishes").orderBy("title");
        }

        // Fetch ingredients for each dish
        const dishesWithIngredients = await Promise.all(dishes.map(async (dish) => {
            const ingredients = await knex("ingredients").where({ dish_id: dish.id }).orderBy("name");
            return {
                ...dish,
                ingredients
            };
        }));

        return response.json(dishesWithIngredients);
    }
}

module.exports = DishesController;