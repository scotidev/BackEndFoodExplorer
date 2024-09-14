const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const { Router } = require("express")

const dishesRouter = Router()

const DishesController = require("../controllers/DishesController")

const dishesController = new DishesController()

dishesRouter.use(ensureAuthenticated)

dishesRouter.get("/:id", dishesController.show) 
dishesRouter.get("/", dishesController.index) 

module.exports = dishesRouter
