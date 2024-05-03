const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

// Rota para criar um novo administrador
router.post('/criar', AdminController.createAdmin);

module.exports = router;