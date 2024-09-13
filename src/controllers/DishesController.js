const knex = require("../database/knex")

class DishesController {
    
    async show(request, response) {
        const { id } = request.params

        const dish = await knex("dishes").where({id}).first()
        const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name")

        return response.status(200).json({
            ...dish,
            ingredients
        })
    }

    async index(request, response) {
        const { title, ingredients } = request.query

        let dishes
        
        if(ingredients) {
            const listedIngredients = ingredients.split(",").map(ingredient => ingredient.trim())

           dishes = await knex("ingredients").select([
            "dishes.id",
            "dishes.title",
            "dishes.price",
            "dishes.category",
            "dishes.image"
           ])
           .whereLike("dishes.title", `%${title}$%`)
           .whereIn("name", listedIngredients)
           .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
           .orderBy("dishes.title")

        } else {
            dishes = await knex("dishes")
            .whereLike("title", `%${title}$%`)
        }

        const dishesIngredients = await knex("ingredients")
        const dishesContainingIngredients = dishes.map(dish => {
            const dishIngredient = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id)
            
            return {
                ...dish,
                ingredients: dishIngredient
            }
        })

        return response.json(dishesContainingIngredients)
    }
}


module.exports = DishesController