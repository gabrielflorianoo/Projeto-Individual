const express = require("express");
const router = express.Router();

// Importar o controller de usuários
const UserController = require("../controllers/UserController");

// Importar o middleware de autenticação
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para mostrar todos os usuários cadastrados
router.get("/", UserController.showUsers);

// Rota para cadastro de usuários
router.post("/registrar", UserController.register); // Middleware de criar usuários

// Rota para atualizar dados pessoais do usuário
router.put("/atualizar", authMiddleware, UserController.updateUser);

// Rota para deletar um usuário
router.delete("/deletar", authMiddleware, UserController.deleteUser);

module.exports = router;
