const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcryptjs"); // Incriptar senhas

const prisma = new PrismaClient();
const User = prisma.user;

const createAdmin = async (req, res) => {
	try {
		// Extrair os dados do corpo da requisição
		const { nome, email, senha } = req.body;

		// Verificar se o usuário já é um administrador
		const existingAdmin = await User.findFirst({
			where: { email, isAdmin: true },
		});
		if (existingAdmin) {
			return res
				.status(400)
				.json({ error: "Este usuário já é um administrador." });
		}

		// Criar o novo administrador
		const newAdmin = await User.create({
			data: {
				name: nome,
				email: email,
				pass: await bcrypt.hash(senha, 10),
				isAdmin: true,
			},
		});

		if (!newAdmin) {
			return res.status(500).json({
				error: "Erro ocorreu ao criar administrador.",
			});
		}

		// Retornar uma resposta de sucesso
		return res
			.status(201)
			.json({ message: "Novo administrador criado com sucesso!" });
	} catch (error) {
		console.error("Erro ao criar administrador:", error);
		return res.status(500).json({
			error: "Erro ao criar administrador. Por favor, tente novamente mais tarde.",
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const userId = parseInt(req.params.userId);

		// Verificar se o usuário a ser excluído existe e não é um administrador
		const userToDelete = await User.findFirst({
			where: { id: userId, isAdmin: false },
		});
		if (!userToDelete) {
			return res.status(404).json({
				error: "Usuário não encontrado ou é um administrador.",
			});
		}

		// Excluir o usuário
		await User.delete({ where: { id: userId } });

		// Retornar uma resposta de sucesso
		return res
			.status(200)
			.json({ message: "Usuário excluído com sucesso!" });
	} catch (error) {
		console.error("Erro ao excluir usuário:", error);
		return res.status(500).json({
			error: "Erro ao excluir usuário. Por favor, tente novamente mais tarde.",
		});
	}
};

module.exports = {
	createAdmin,
	deleteUser,
};
