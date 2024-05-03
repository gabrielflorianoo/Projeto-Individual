const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

/* GET home page. */
router.post("/criar", ProductController.createProduct);

module.exports = router;
