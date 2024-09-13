const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class DishesController {
    async create(request, response) {
        const { title, price, description, category, ingredients} = request.body

        const checkIfDishExists = await knex("dishes").where({title}).first()

        if(checkIfDishExists) {
            throw new AppError("Este prato já foi cadastrado.")
        }

    }

    async update(request, response) {
        const { id } = request.params
    }

    async delete(request, response) {
        const { id } = request.params
    }

}

module.exports = DishesController