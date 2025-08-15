const knex = require("../database/knex");

class CartController {
  async create(request, response) {
    const user_id = request.user.id;
    const { dish_id, quantity } = request.body;

    await knex("cart_items").insert({
      user_id,
      dish_id,
      quantity,
    });

    return response.status(201).json({
      message: "Prato adicionado ao carrinho.",
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { quantity } = request.body;
    const user_id = request.user.id;

    await knex("cart_items").where({ id, user_id }).update({ quantity });

    return response.status(200).json({
      message: "Quantidade atualizada no carrinho.",
    });
  }

  async index(request, response) {
    const user_id = request.user.id;

    const cartItems = await knex("cart_items")
      .where({ user_id })
      .select([
        "cart_items.id",
        "cart_items.quantity",
        "dishes.title",
        "dishes.price",
        "dishes.image",
      ])
      .join("dishes", "dishes.id", "cart_items.dish_id");

    return response.json(cartItems);
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    await knex("cart_items").where({ id, user_id }).delete();

    return response.status(200).json({
      message: "Prato removido do carrinho.",
    });
  }
}

module.exports = CartController;
