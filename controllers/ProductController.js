const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Product = prisma.product;

// Função para mostrar todos os produtos com paginação
const showProducts = async (req, res) => {
    try {
        console.log("Fetching products...");

        // Extrair os parâmetros da query string
        const { limite = 10, pagina = 1 } = req.query;

        // Definir os valores permitidos para limite
        const validLimits = [5, 10, 30];
        const limit = parseInt(limite, 10);
        const page = parseInt(pagina, 10);

        if (!validLimits.includes(limit)) {
            return res.status(400).json({ error: "Valor inválido para limite. Use 5, 10 ou 30." });
        }

        if (page < 1) {
            return res.status(400).json({ error: "A página deve ser maior ou igual a 1." });
        }

        // Calcular o offset
        const offset = (page - 1) * limit;

        // Buscar produtos com paginação
        const products = await Product.findMany({
            take: limit,
            skip: offset,
            include: {
                user: true
            }
        });

        console.log("Products fetched:", products);
        res.status(200).json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
};

const createProduct = async (req, res) => {
	try {
		// Pegar o id do usuário pelo seu token
		const userId = req.user.userId;

		// Extrair os dados do corpo da requisição
		const { nome, preco } = req.body;
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
		return res.status(201).json({
			message: "Produto criado com sucesso",
			product: newProduct,
		});
	} catch (error) {
		console.error("Erro ao criar produto:", error);
		// Retornar uma resposta de erro caso ocorra algum problema
		return res.status(500).json({
			error: "Erro ao criar produto. Por favor, tente novamente mais tarde.",
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const productId = parseInt(req.params.productId);

		// Verificar se o produto existe
		const productToDelete = await prisma.product.findFirst({
			where: { id: productId },
		});
		if (!productToDelete) {
			return res.status(404).json({
				error: "Produto não encontrado.",
			});
		} else if (req.user.userId != productToDelete.userId) {
			// Verifica se o id do usuário é o id do dono do produto
			return res
				.status(200)
				.json({ message: "Apenas o dono do produto pode excluí-lo!" });
		}

		// Excluir o produto
		await prisma.product.delete({ where: { id: productId } });

		// Retornar uma resposta de sucesso
		return res
			.status(200)
			.json({ message: "Produto excluído com sucesso!" });
	} catch (error) {
		console.error("Erro ao excluir produto:", error);
		return res.status(500).json({
			error: "Erro ao excluir produto. Por favor, tente novamente mais tarde.",
		});
	}
};

module.exports = {
	showProducts,
	createProduct,
	deleteProduct,
};
