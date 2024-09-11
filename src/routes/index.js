const { Router } = require("express") 

const routes = Router()

//Rotas 
const usersRouter = require("./users.routes")
const dishesRouter = require("./dishes.routes")
const sessionsRouter = require("./sessions.routes")

//Direcionamento para as rotas
routes.use("/users", usersRouter)
routes.use("/dishes", dishesRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;