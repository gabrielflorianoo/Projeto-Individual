const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
	try {
		// Extrair os dados do corpo da requisição
		const { nome, preco, userId } = req.body;
        const id = parseInt(userId);

		// Verificar se o usuário existe
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Criar o produto associado ao usuário
		const newProduct = await prisma.product.create({
			data: {
				name: nome,
				price: preco,
				user: {
					connect: { id: id },
				},
			},
		});

		// Retornar uma resposta de sucesso com o novo produto criado
		return res
			.status(201)
			.json({
				message: "Produto criado com sucesso",
				product: newProduct,
			});
	} catch (error) {
		console.error("Erro ao criar produto:", error);
		// Retornar uma resposta de erro caso ocorra algum problema
		return res
			.status(500)
			.json({
				error: "Erro ao criar produto. Por favor, tente novamente mais tarde.",
			});
	}
};

module.exports = {
	createProduct,
};
