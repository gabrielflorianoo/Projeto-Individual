const express = require("express");
const router = express.Router();

// Importar o controller de usuários
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para cadastro de usuários
router.post("/registrar", UserController.register); // Middleware de criar usuários

// Rota para atualizar dados pessoais do usuário
router.put("/atualizar", authMiddleware, UserController.updateUser);

module.exports = router;
