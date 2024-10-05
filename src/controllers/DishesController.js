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
        const { title } = request.query

        let dishes
        
        if(title) {
            const dishesList = await knex("dishes")
            .whereLike("title", `%${title}$%`).orderBy("title")

            if (dishesList.length == 0) {
                const dishesIngredients = await knex("ingredients")
                .select("dishes.*")
                .whereLike("ingredients.title", `%${title}%`)
                .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
                .orderBy("dishes.title")
                .groupBy("dishes.id")

                dishes = dishesIngredients
            } else {
                dishes = dishesList
            }
            
        } else {
            dishes = await knex("dishes").orderBy("title")
        }

        return response.json(dishes)

        //retornar os ingredientes também?
    }
}



module.exports = DishesController