const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Função para cadastrar um novo usuário
const register = async (req, res) => {
	try {
		// Extrair os dados do corpo da requisição
		const { nome, email, senha } = req.body;

		// Aqui você pode adicionar a lógica para validar os dados do usuário antes de criar
		// Por exemplo, verificar se o e-mail já está cadastrado

		const found = await prisma.users.findFirst({
            where: {
                OR: [{ name: nome }, { email: email }],
            },
        });

		if (!found) {
			const newUser = await prisma.users.create({
				data: {
					name: nome,
					email: email,
					pass: senha,
				},
			});

			if (!newUser) {
				return res.status(500).json({
					error: "Erro ocorreu ao criar usuário.",
				});
			}
		} else {
			return res.status(501).json({
				error: "Usuário já cadastrado.",
			});
		}

		// Retornar uma resposta de sucesso
		return res
			.status(201)
			.json({ message: "Usuário cadastrado com sucesso!" });
	} catch (error) {
		// Retornar uma resposta de erro caso ocorra algum problema
		return res.status(504).json({
			error: "Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.",
		});
	}
};

const login = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const found = await prisma.users.findFirst({
            where: {
                name: nome,
                email: email,
                pass: senha
            }
        });

        if (found) {
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
}

module.exports = {
	register,
    login
};
