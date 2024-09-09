const { Router } = require("express") 

const routes = Router()

//Rotas 
const usersRoutes = require("./users.routes")
const productsRoutes = require("./products.routes")

//Direcionamento para as rotas
routes.use("/users", usersRoutes)
routes.use("/products", productsRoutes)

module.exports = routes;