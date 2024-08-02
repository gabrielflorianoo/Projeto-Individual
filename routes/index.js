const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

/* Rota para a página inicial */
router.get("/", function (req, res, next) {
	res.send("Nada para mostrar aqui");
});

/* Rota para instalar o banco de dados e executar o script SQL */
router.get("/install", function (req, res, next) {
  const filePath = path.join(__dirname, '../public/files/Script.sql'); // Caminho absoluto para o arquivo
  try {
    const sqlScript = fs.readFileSync(filePath, 'utf8'); // Lê o arquivo de forma síncrona
    res.send(sqlScript);
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento de erros
  }
});

module.exports = router;
