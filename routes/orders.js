const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware.js");
const OrderController = require("../controllers/OrderController.js");

// Rota para mostrar todos os usuários cadastrados
router.get("/", OrderController.showOrders);

// Rota para criar um pedido
router.post("/criar", authMiddleware, OrderController.createOrder);

// Rota para excluir um pedido
router.delete("/excluir/:orderId", authMiddleware, OrderController.deleteOrder);

module.exports = router;
