const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { dish_id } = request.body;
    const [favorite] = await knex("favorites").where({ user_id, dish_id });

    if (favorite) {
      await knex("favorites").where({ id: favorite.id }).delete();
      return response.json({
        message: "Prato removido dos favoritos.",
        status: "removed",
      });
    } else {
      await knex("favorites").insert({ user_id, dish_id });
      return response.json({
        message: "Prato adicionado aos favoritos.",
        status: "added",
      });
    }
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("favorites")
      .where({ user_id })
      .join("dishes", "dishes.id", "favorites.dish_id")
      .select("dishes.*", "favorites.id as favorite_id");

    return response.json(favorites);
  }
}

module.exports = FavoritesController;
