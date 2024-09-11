const { Router } = require("express")

const productsRouter = Router()

const ProductsController = require("../controllers/ProductsController")

const productsController = new ProductsController()

productsRouter.get("/", productsController.index) 
productsRouter.get("/:id", productsController.show) 
productsRouter.post("/", productsController.create)
productsRouter.delete("/id", productsController.delete)

module.exports = productsRouter
