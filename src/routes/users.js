const { Router } = require("express");
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

const usersRouter = Router();

usersRouter.get("/users", authMiddleware(), userController.listUsers); // Acesso para todos os usuários autenticados
usersRouter.post("/users", authMiddleware(), userController.createUser); // Rota pública para criação de usuários
usersRouter.get("/users/:id", authMiddleware(), userController.getUserById); // Somente autenticado pode acessar
usersRouter.put("/users/:id", authMiddleware(), userController.updateUser); // Somente autenticado pode editar
usersRouter.delete("/users/:id", authMiddleware(), userController.deleteUser); // Somente autenticado pode deletar

module.exports = usersRouter;
