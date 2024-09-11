const { Router } = require("express") 

const SessionsController = require("../controllers/SessionsController")
const sessionsController = new SessionsController()

const sessionsRouter = Router()

sessionsRouter.post("/", sessionsController)

module.exports = sessionsRouter