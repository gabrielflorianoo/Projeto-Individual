const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware.js");

const ProductController = require("../controllers/ProductController");

// Rota para mostrar todos os usuários cadastrados
router.get("/", ProductController.showProducts);

/* GET home page. */
router.post("/criar", authMiddleware, ProductController.createProduct);

router.delete("/excluir/:productId", authMiddleware, ProductController.deleteProduct);

module.exports = router;
