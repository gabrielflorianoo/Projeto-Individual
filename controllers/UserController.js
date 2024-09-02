<<<<<<< HEAD
const bcrypt = require('bcryptjs');
const { User } = require('../Sequelize/Models.js');
const { Op } = require('sequelize');

// Função para mostrar todos os usuários com paginação
const showUsers = async (req, res) => {
    try {
        console.log('Fetching users...');

        // Extrair os parâmetros da query string
        const { limite = 10, pagina = 1 } = req.query;

        // Definir os valores permitidos para limite
        const validLimits = [5, 10, 30];
        const limit = parseInt(limite, 10);
        const page = parseInt(pagina, 10);

        if (!validLimits.includes(limit)) {
            return res.status(400).json({
                error: 'Valor inválido para limite. Use 5, 10 ou 30.',
            });
        }

        if (page < 1) {
            return res
                .status(400)
                .json({ error: 'A página deve ser maior ou igual a 1.' });
        }

        // Calcular o offset
        const offset = (page - 1) * limit;

        // Buscar usuários com paginação
        const users = await User.findAll({
            limit: limit,
            offset: offset,
        });

        console.log('Users fetched:', users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

// Função para cadastrar um novo usuário
const register = async (req, res) => {
    try {
        // Extrair os dados do corpo da requisição
        const { nome, email, senha } = req.body;

        // Verificar se já existe um usuário com o mesmo nome ou email
        const found = await User.findOne({
            where: {
                [Op.or]: [{ name: nome }, { email: email }],
            },
        });

        if (!found) {
            const hashedPassword = await bcrypt.hash(senha, 10);

            // Criar o novo usuário
            const newUser = await User.create({
                name: nome,
                email: email,
                pass: hashedPassword,
            });

            if (!newUser) {
                console.error('Error occurred while creating user.');
                return res.status(500).json({
                    error: 'Erro ocorreu ao criar usuário.',
                });
            }

            // Retornar uma resposta de sucesso
            return res
                .status(201)
                .json({ message: 'Usuário cadastrado com sucesso!' });
        } else {
            console.log('User already exists.');
            return res.status(501).json({ error: 'Usuário já cadastrado.' });
        }
    } catch (error) {
        console.error('Error occurred during registration:', error);
        // Retornar uma resposta de erro caso ocorra algum problema
        return res.status(504).json({
            error: 'Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.',
        });
    }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { nome, email, senha } = req.body;

        // Verificar se o usuário existe no banco de dados
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica se a senha é igual a anterior
        const hashedNewPassword = senha
            ? await bcrypt.hash(senha, 10)
            : user.pass; // Hash da nova senha se fornecida
        const senhaIgual = await bcrypt.compare(senha, user.pass); // Verifica se a nova senha é igual à antiga

        // Atualizar os dados pessoais do usuário
        const updatedUser = await user.update({
            name: nome || user.name, // Atualiza o nome se fornecido no corpo da requisição
            email: email || user.email, // Atualiza o email se fornecido no corpo da requisição
            pass: senhaIgual ? user.pass : hashedNewPassword, // Hash da senha se fornecida
        });

        if (!updatedUser) {
            return res.status(404).json({
                error: 'Erro ocorreu ao atualizar os dados do usuário.',
            });
        }

        // Retornar uma resposta de sucesso
        return res
            .status(200)
            .json({ message: 'Dados pessoais atualizados com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar dados pessoais do usuário:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar dados pessoais do usuário. Por favor, tente novamente mais tarde.',
        });
    }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { senha } = req.body;

        // Verificar se o usuário existe no banco de dados
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica se a senha é igual a anterior
        const senhaIgual = await bcrypt.compare(senha, user.pass); // Verifica se a nova senha é igual à antiga

        if (!senhaIgual) {
            return res.status(403).json({
                error: 'Senha incorreta.',
            });
        }

        // Deleta o usuário da base de dados
        await User.destroy({ where: { id: userId } });

        // Retornar uma resposta de sucesso
        return res.status(200).json({ message: 'Conta deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar conta pessoal:', error);
        return res.status(500).json({
            error: 'Erro ao deletar conta. Por favor, tente novamente mais tarde.',
        });
    }
};

module.exports = {
    showUsers,
    register,
    updateUser,
    deleteUser,
};
=======
const bcrypt = require("bcryptjs");
const { User } = require("../Sequelize/Models.js");
const { Op } = require('sequelize');

// Função para mostrar todos os usuários com paginação
const showUsers = async (req, res) => {
	try {
		console.log("Fetching users...");

		// Extrair os parâmetros da query string
		const { limite = 10, pagina = 1 } = req.query;

		// Definir os valores permitidos para limite
		const validLimits = [5, 10, 30];
		const limit = parseInt(limite, 10);
		const page = parseInt(pagina, 10);

		if (!validLimits.includes(limit)) {
			return res
				.status(400)
				.json({
					error: "Valor inválido para limite. Use 5, 10 ou 30.",
				});
		}

		if (page < 1) {
			return res
				.status(400)
				.json({ error: "A página deve ser maior ou igual a 1." });
		}

		// Calcular o offset
		const offset = (page - 1) * limit;

		// Buscar usuários com paginação
		const users = await User.findAll({
			limit: limit,
			offset: offset,
		});

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

		// Verificar se já existe um usuário com o mesmo nome ou email
		const found = await User.findOne({
			where: {
				[Op.or]: [{ name: nome }, { email: email }],
			},
		});

		if (!found) {
			const hashedPassword = await bcrypt.hash(senha, 10);

			// Criar o novo usuário
			const newUser = await User.create({
				name: nome,
				email: email,
				pass: hashedPassword,
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
};

const updateUser = async (req, res) => {
	try {
		const userId = req.user.userId;
		const { nome, email, senha } = req.body;

		// Verificar se o usuário existe no banco de dados
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Verifica se a senha é igual a anterior
		const hashedNewPassword = senha
			? await bcrypt.hash(senha, 10)
			: user.pass; // Hash da nova senha se fornecida
		const senhaIgual = await bcrypt.compare(senha, user.pass); // Verifica se a nova senha é igual à antiga

		// Atualizar os dados pessoais do usuário
		const updatedUser = await user.update({
			name: nome || user.name, // Atualiza o nome se fornecido no corpo da requisição
			email: email || user.email, // Atualiza o email se fornecido no corpo da requisição
			pass: senhaIgual ? user.pass : hashedNewPassword, // Hash da senha se fornecida
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
		const { senha } = req.body;

		// Verificar se o usuário existe no banco de dados
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Verifica se a senha é igual a anterior
		const senhaIgual = await bcrypt.compare(senha, user.pass); // Verifica se a nova senha é igual à antiga

		if (!senhaIgual) {
			return res.status(403).json({
				error: "Senha incorreta.",
			});
		}

		// Deleta o usuário da base de dados
		await User.destroy({ where: { id: userId } });

		// Retornar uma resposta de sucesso
		return res.status(200).json({ message: "Conta deletada com sucesso!" });
	} catch (error) {
		console.error("Erro ao deletar conta pessoal:", error);
		return res.status(500).json({
			error: "Erro ao deletar conta. Por favor, tente novamente mais tarde.",
		});
	}
};

module.exports = {
	showUsers,
	register,
	updateUser,
	deleteUser,
};
>>>>>>> ec00b737a453fb0f99a6c2e3cd2185bf6cc9e969
