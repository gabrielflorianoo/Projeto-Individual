const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middlewares/admin.js");

// Importar o middleware de administrador
const authController = require('../controllers/AuthController');
const AdminController = require('../controllers/AdminController');

// Rota para criar um novo administrador
router.post('/cadastrar', adminMiddleware, AdminController.createAdmin);
router.post('/token', authController.login);

// Rota para excluir um usuário não administrador
router.delete('/excluir/:userId', adminMiddleware, AdminController.deleteUser);

module.exports = router;
