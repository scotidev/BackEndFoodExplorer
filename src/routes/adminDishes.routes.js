const { Router } = require("express") 
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const AdminDishesController = require("../controllers/AdminDishesController")
const DishImagesController = require("../controllers/DishImagesController")

// instanciando classes em memória e executando funções
const upload = multer(uploadConfig.MULTER)
const adminDishesRouter = Router()

const adminDishesController = new AdminDishesController()
const dishImagesController = new DishImagesController()

// middleware de autenticação

adminDishesRouter.use(ensureAuthenticated)
adminDishesRouter.use(verifyUserAuthorization("admin"))

// direcionando rotas

adminDishesRouter.post("/", upload.single("image"), adminDishesController.create)
adminDishesRouter.delete("/:id", adminDishesController.delete)
adminDishesRouter.put("/:id", adminDishesController.update)
adminDishesRouter.patch("/dishImage/:id", upload.single("image"), dishImagesController.update)

module.exports = adminDishesRouter