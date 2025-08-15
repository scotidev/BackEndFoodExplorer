const { Router } = require("express");
const CartController = require("../controllers/CartController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const cartController = new CartController();
const cartRoutes = Router();

cartRoutes.use(ensureAuthenticated);

cartRoutes.post("/", cartController.create);
cartRoutes.patch("/:id", cartController.update);
cartRoutes.get("/", cartController.index);
cartRoutes.delete("/:id", cartController.delete);

module.exports = cartRoutes;
