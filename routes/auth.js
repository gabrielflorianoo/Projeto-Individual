const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

// Rota para login e geração de token JWT
router.post('/', AuthController.login);

module.exports = router;
