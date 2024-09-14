const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class AdminDishesController {
    async create(request, response) {
        const { title, price, description, category, ingredients} = request.body

        const checkIfDishExists = await knex("dishes").where({title}).first()

        if(checkIfDishExists) {
            throw new AppError("Este prato já foi cadastrado.")
        }

        const dishFilename = request.file.filename
        const diskStorage = new DiskStorage()
        const filename = await diskStorage.saveFile(dishFilename)

        const dish_id = (await knex("dishes").insert({
            title,
            description,
            category,
            price,
            image: filename
        }))[0]

        const addIngredient = ingredients.map(ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        await knex("ingredients").insert(addIngredient)

        return response.status(200).json()
    }

    async update(request, response) {
        const { id } = request.params
        const { title, price, description, category, ingredients, image} = request.body
        const dish = await knex("dishes").where({id}).first()

        dish.title = title ?? dish.title
        dish.price = price ?? dish.price
        dish.description = description ?? dish.description
        dish.category = category ?? dish.category
        dish.image = image ?? dish.image

        await knex ("dishes").where({id}).update(dish)
        await knex("dishes").where({id}).update("updated_at", knex.fn.now())

        const oneIngredient = typeof(ingredients) === "string";

        let addIngredient

        if (oneIngredient) {
          addIngredient = {
            dish_id: dish.id,
            name: ingredients
          }
        } else if (ingredients != "string") {
          addIngredient = ingredients.map(ingredient => {
            return {
              dish_id: dish.id,
              name : ingredient
            }
          })
        }

        await knex("ingredients").where({dish_id: id}).delete()
        await knex("ingredients").where({dish_id: id}).insert(addIngredient)

        return response.status(200).json()
    }

    async delete(request, response) {
        const { id } = request.params

        const checkIfDishExists = await knex("dishes").where({id}).first()

        if(!checkIfDishExists) {
            throw new AppError("Este prato não existe.")
        }

        await knex("dishes").where({id}).delete()

        return response.status(200).json()
    }

}

module.exports = AdminDishesController