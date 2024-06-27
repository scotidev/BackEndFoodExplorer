const { Router } = require("express") 

const routes = Router()

//Rotas 
const usersRoutes = require("./users.routes")

//Direcionamento para as rotas
routes.use("/users", usersRoutes)

module.exports = routes;