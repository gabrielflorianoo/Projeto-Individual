const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const User = prisma.user;

// Função para mostrar todos os usuários
const showUsers = async (req, res) => {
	try {
		console.log("Fetching users...");
		const users = await User.findMany();
		console.log("Users fetched:", users);
		res.status(200).json(users);
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		res.status(500).json({ error: "Erro ao buscar usuários." });
	}
};

// Função para cadastrar um novo usuário
const register = async (req, res) => {
	try {
		// Extrair os dados do corpo da requisição
		const { nome, email, senha } = req.body;

		const found = await User.findFirst({
			where: {
				OR: [{ name: nome }, { email: email }],
			},
		});

		if (!found) {
			const hashedPassword = await bcrypt.hash(senha, 10);

			const newUser = await User.create({
				data: {
					name: nome,
					email: email,
					pass: hashedPassword,
				},
			});

			if (newUser.name == process.env.ADMIN_USER &&
				newUser.email == process.env.ADMIN_EMAIL &&
				newUser.pass == process.env.ADMIN_PASS
			) {
				newUser.isAdmin = true;
			} else {
				newUser.isAdmin = false;
			}

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
};

// const login = async (req, res) => {
// 	try {
// 		const { nome, email, senha } = req.body;

// 		const found = await User.findFirst({
// 			where: {
// 				name: nome,
// 				email: email,
// 			},
// 		});

// 		// Verificar se a senha está correta
// 		const isPasswordValid = await bcrypt.compare(senha, found.pass);
// 		if (!isPasswordValid) {
// 			return res.status(401).json({ error: "Credenciais inválidas." });
// 		}

// 		if (found && isPasswordValid) {
// 			res.json(req.body);
// 		} else {
// 			return res.status(500).json({
// 				error: "Usuário não encontrado.",
// 			});
// 		}
// 	} catch (error) {
// 		return res.status(504).json({
// 			error: "Erro ao realizar login. Por favor, tente novamente mais tarde.",
// 		});
// 	}
// };

const updateUser = async (req, res) => {
	try {
		const userId = req.user.userId;
		const { nome, email, senha } = req.body;

		// Verificar se o usuário existe no banco de dados
		const user = await User.findFirst({
			where: { id: userId },
		});

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Verifica se a senha é igual a anterior
		const hashedNewPassword = senha
			? await bcrypt.hash(senha, 10)
			: user.pass; // Hash da nova senha se fornecida
		const senhaIgual = await bcrypt.compare(senha, user.pass); // Verifica se a nova senha é igual à antiga

		// Atualizar os dados pessoais do usuário
		const updatedUser = await User.update({
			where: { id: userId },
			data: {
				name: nome || user.name, // Atualiza o nome se fornecido no corpo da requisição
				email: email || user.email, // Atualiza o email se fornecido no corpo da requisição
				pass: senhaIgual ? user.pass : hashedNewPassword, // Hash da senha se fornecida
			},
		});

		if (!updatedUser) {
			return res.status(404).json({
				error: "Erro ocorreu ao atualizar os dados do usuário.",
			});
		}

		// Retornar uma resposta de sucesso
		return res
			.status(200)
			.json({ message: "Dados pessoais atualizados com sucesso!" });
	} catch (error) {
		console.error("Erro ao atualizar dados pessoais do usuário:", error);
		return res.status(500).json({
			error: "Erro ao atualizar dados pessoais do usuário. Por favor, tente novamente mais tarde.",
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const userId = req.user.userId;
		const { nome, email, senha } = req.body;

		// Verificar se o usuário existe no banco de dados
		const user = await User.findFirst({
			where: { id: userId },
		});

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Verifica se a senha é igual a anterior
		const hashedNewPassword = senha
			? await bcrypt.hash(senha, 10)
			: user.pass; // Hash da nova senha se fornecida
		const senhaIgual = await bcrypt.compare(senha, user.pass); // Verifica se a nova senha é igual à antiga

		// Deleta o usuário da base de dados
		await User.delete({ where: { id: userId } });

		// Retornar uma resposta de sucesso
		return res
			.status(200)
			.json({ message: "Dados pessoais atualizados com sucesso!" });
	} catch (error) {
		console.error("Erro ao atualizar dados pessoais do usuário:", error);
		return res.status(500).json({
			error: "Erro ao atualizar dados pessoais do usuário. Por favor, tente novamente mais tarde.",
		});
	}
};

module.exports = {
	showUsers,
	register,
	// login,
	updateUser,
	deleteUser,
};
