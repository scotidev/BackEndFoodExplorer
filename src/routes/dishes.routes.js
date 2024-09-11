const { Router } = require("express")

const dishesRouter = Router()

const DishesController = require("../controllers/DishesController")

const dishesController = new DishesController()

dishesRouter.get("/", dishesController.index) 
dishesRouter.get("/:id", dishesController.show) 
dishesRouter.post("/", dishesController.create)
dishesRouter.delete("/id", dishesController.delete)

module.exports = dishesRouter
