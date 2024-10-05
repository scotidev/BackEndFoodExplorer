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

        const insertIngredients = ingredients.map(ingredient => {
            return {
                name: ingredient,
                dish_id
            }
        })

        await knex("ingredients").insert(insertIngredients)
        
        return response.status(201).json("Prato criado com sucesso.")
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

        await knex ("dishes").where({id}).update({
          title: dish.title,
          price: dish.price,
          description: dish.description,
          category: dish.category
        })

        await knex("ingredients").where({dish_id: id}).delete()

        const ingredientsInsert = ingredients?.map((ingredient) => {
          return {
            dish_id: id,
            name: ingredient
          }
        })

        if(ingredientsInsert?.length > 0) {
          await knex("ingredients").insert(ingredientsInsert)
        }

        return response.json("Prato atualizado com sucesso")
    }
      
      async delete(request, response) {
          const { id } = request.params
  
          const checkIfDishExists = await knex("dishes").where({id}).first()
  
          if(!checkIfDishExists) {
              throw new AppError("Este prato não existe.")
          }
  
          await knex("dishes").where({id}).delete()
  
          return response.status(200).json("Prato deletado")
      }
}

module.exports = AdminDishesController