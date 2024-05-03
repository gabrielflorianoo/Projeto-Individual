const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	// Verificar se há um token JWT na header da requisição
	const token = req.headers.authorization;

	if (!token) {
		return res
			.status(401)
			.json({ error: "Token de autenticação não fornecido." });
	}

	try {
		// Verificar se o token é válido
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// Adicionar as informações do usuário ao objeto de requisição
		req.user = {
			userId: decodedToken.userId,
			isAdmin: decodedToken.isAdmin,
		};

		// Chamar o próximo middleware
		next();
	} catch (error) {
		console.error("Erro de autenticação:", error);
		return res
			.status(401)
			.json({ error: "Token de autenticação inválido." });
	}
};

module.exports = authMiddleware;
