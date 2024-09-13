const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const { Router } = require("express")

const dishesRouter = Router()

const DishesController = require("../controllers/DishesController")

const dishesController = new DishesController()

dishesRouter.use(ensureAuthenticated)

dishesRouter.get("/", dishesController.index) 
dishesRouter.get("/:id", dishesController.show) 

module.exports = dishesRouter
