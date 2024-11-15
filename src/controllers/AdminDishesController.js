const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")
const fs = require("fs")
const path = require("path")

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

        if (!title || !category || !description || !price) {
          throw new AppError("Preencha todos os campos")
        }

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
        const { title, price, description, category, ingredients } = request.body;
        const { id } = request.params;

        // Define valid categories
        const validCategories = ['food', 'drink', 'dessert'];

        try {
            // Validate category
            if (category && !validCategories.includes(category)) {
                return response.status(400).json({ error: "Invalid category" });
            }

            const dish = await knex("dishes").where({ id }).first();
            if (!dish) {
                return response.status(404).json({ error: "Dish not found" });
            }

            dish.title = title ?? dish.title;
            dish.price = price ?? dish.price;
            dish.description = description ?? dish.description;
            dish.category = category ?? dish.category;

            const updateData = {
                title: dish.title,
                price: dish.price,
                description: dish.description,
                category: dish.category,
            };

            const updatedDish = await knex("dishes").where({ id }).update(updateData);

            if (updatedDish === 0) {
                return response.status(500).json({ error: "Failed to update dish" });
            }

            await knex("ingredients").where({ dish_id: id }).delete();

            const ingredientsInsert = ingredients?.map((ingredient) => {
                return {
                    dish_id: id,
                    name: ingredient
                };
            });

            if (ingredientsInsert?.length > 0) {
                await knex("ingredients").insert(ingredientsInsert);
            }

            const updatedDishData = await knex("dishes").where({ id }).first();

            return response.json({ message: "Dish updated successfully", updatedDish: updatedDishData });
        } catch (error) {
            return response.status(500).json({ error: "Internal server error" });
        }
    }
      
    async delete(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();

        if (!dish) {
            return response.status(404).json({ error: 'Dish not found' });
        }

        const diskStorage = new DiskStorage();

        if (dish.image) {
            await diskStorage.deleteFile(dish.image);
        }

        await knex("dishes").where({ id }).del();

        return response.status(204).send();
    }
}

module.exports = AdminDishesController