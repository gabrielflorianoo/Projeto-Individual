const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
	try {
		// Extrair os dados do corpo da requisição
		const { quantity, productId, userId } = req.body;

		// Verificar se o produto existe
		const product = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!product) {
			return res.status(404).json({ error: "Produto não encontrado." });
		}

		// Verificar se o usuário existe
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Criar a ordem associada ao produto e ao usuário
		const newOrder = await prisma.order.create({
			data: {
				quantity: quantity,
				product: { connect: { id: productId } },
				user: { connect: { id: userId } },
			},
		});

		// Retornar uma resposta de sucesso com a nova ordem criada
		return res.status(201).json({
			message: "Pedido criado com sucesso",
			order: newOrder,
		});
	} catch (error) {
		console.error("Erro ao criar pedido:", error);
		return res.status(500).json({
			error: "Erro ao criar pedido. Por favor, tente novamente mais tarde.",
		});
	}
};

const deleteOrder = async (req, res) => {
	try {
		const orderId = parseInt(req.params.orderId);

		// Verificar se a ordem existe
		const orderToDelete = await prisma.order.findUnique({
			where: { id: orderId },
		});

		if (!orderToDelete) {
			return res.status(404).json({
				error: "Pedido não encontrado.",
			});
		} else if (req.user.userId !== orderToDelete.userId) {
			// Verifica se o id do usuário é o id do dono da ordem
			return res.status(403).json({
				error: "Apenas o dono do pedido pode excluí-lo.",
			});
		}

		// Excluir o pedido
		await prisma.order.delete({ where: { id: orderId } });

		// Retornar uma resposta de sucesso
		return res
			.status(200)
			.json({ message: "Pedido excluído com sucesso!" });
	} catch (error) {
		console.error("Erro ao excluir pedido:", error);
		return res.status(500).json({
			error: "Erro ao excluir pedido. Por favor, tente novamente mais tarde.",
		});
	}
};

module.exports = {
	createOrder,
	deleteOrder,
};
