const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Função para cadastrar um novo usuário
const register = async (req, res) => {
	try {
		// Extrair os dados do corpo da requisição
		const { nome, email, senha } = req.body;

		console.log("Received registration request:", nome, email);

		// Aqui você pode adicionar a lógica para validar os dados do usuário antes de criar
		// Por exemplo, verificar se o e-mail já está cadastrado

		const found = await prisma.users.findFirst({
			where: {
				OR: [{ name: nome }, { email: email }],
			},
		});

		if (!found) {
			const hashedPassword = await bcrypt.hash(senha, 10);

			const newUser = await prisma.users.create({
				data: {
					name: nome,
					email: email,
					pass: hashedPassword,
				},
			});

			if (!newUser) {
				console.error("Error occurred while creating user.");
				return res.status(500).json({
					error: "Erro ocorreu ao criar usuário.",
				});
			}

			// Retornar uma resposta de sucesso
			return res
				.status(201)
				.json({ message: "Usuário cadastrado com sucesso!" });
		} else {
			console.log("User already exists.");
			return res.status(501).json({ error: "Usuário já cadastrado." });
		}
	} catch (error) {
		console.error("Error occurred during registration:", error);
		// Retornar uma resposta de erro caso ocorra algum problema
		return res.status(504).json({
			error: "Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.",
		});
	}
}

const login = async (req, res) => {
	try {
		const { nome, email, senha } = req.body;

		const found = await prisma.users.findFirst({
			where: {
				name: nome,
				email: email,
			},
		});

		// Verificar se a senha está correta
		const isPasswordValid = await bcrypt.compare(senha, found.pass);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Credenciais inválidas." });
		}

		if (found && isPasswordValid) {
			res.json(req.body);
		} else {
			return res.status(500).json({
				error: "Usuário não encontrado.",
			});
		}
	} catch (error) {
		return res.status(504).json({
			error: "Erro ao realizar login. Por favor, tente novamente mais tarde.",
		});
	}
};

module.exports = {
	register,
	login,
};
