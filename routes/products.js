const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware.js");

const ProductController = require("../controllers/ProductController");

/* GET home page. */
router.post("/criar", ProductController.createProduct);

router.delete("/excluir/:productId", authMiddleware, ProductController.deleteProduct);

module.exports = router;
