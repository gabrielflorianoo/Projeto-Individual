const express = require("express");
const router = express.Router();

// Importar o controller de usuários
const UserController = require("../controllers/UserController");

// Rota para cadastro de usuários
router.post("/registrar", UserController.register); // Middleware de criar usuários

// Rota para fazer login
router.post("/", UserController.login);

module.exports = router;
