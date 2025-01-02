const { Router } = require("express");
const authController = require("../controllers/AuthController");

const authRouter = Router();

authRouter.post("/auth/login", authController.login);

module.exports = authRouter;
