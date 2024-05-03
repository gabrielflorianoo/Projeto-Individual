const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const User = prisma.users;

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
                pass: senha,
                isAdmin: true,
            }
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
		return res
			.status(500)
			.json({
				error: "Erro ao criar administrador. Por favor, tente novamente mais tarde.",
			});
	}
};

module.exports = {
	createAdmin,
};