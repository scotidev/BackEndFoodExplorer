const { Router } = require("express") 

const routes = Router()

//Rotas 
const usersRouter = require("./users.routes")
const productsRouter = require("./products.routes")
const sessionsRouter = require("./sessions.routes")

//Direcionamento para as rotas
routes.use("/users", usersRouter)
routes.use("/products", productsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;