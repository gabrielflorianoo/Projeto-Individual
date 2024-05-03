const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

// Rota para criar um novo administrador
router.post('/criar', AdminController.createAdmin);

// Rota para excluir um usuário não administrador
router.delete('/excluir/:userId', AdminController.deleteUser);

module.exports = router;