const { Router } = require("express")

const productsRoutes = Router()

const ProductsController = require("../controllers/ProductsController")

const productsController = new ProductsController()

productsRoutes.get("/", productsController.index) 
productsRoutes.get("/:id", productsController.show) 
productsRoutes.post("/", productsController.create)
productsRoutes.delete("/id", productsController.delete)

module.exports = productsRoutes
