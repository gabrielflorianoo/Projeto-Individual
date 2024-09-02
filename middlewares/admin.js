<<<<<<< HEAD
const jwt = require('jsonwebtoken');

// Middleware para checar se usuário é admin
const isAdmin = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    // Check if the token is provided
    if (!token) {
        return res
            .status(401)
            .json({ error: 'Token de autenticação não fornecido.' });
    }

    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user information from the decoded token
        const isAdmin = decodedToken.isAdmin;
        console.log(decodedToken);

        // Check if the user has admin role
        if (!isAdmin) {
            return res.status(403).json({
                error: 'Acesso proibido. Esta rota é restrita aos administradores.',
            });
        }

        // Call the next middleware function
        next();
    } catch (error) {
        // Handle token verification errors
        return res
            .status(401)
            .json({ error: 'Token de autenticação inválido.' });
    }
};

module.exports = isAdmin;
=======
const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
	// Extract the token from the request headers
	const token = req.headers.authorization;

	// Check if the token is provided
	if (!token) {
		return res
			.status(401)
			.json({ error: "Token de autenticação não fornecido." });
	}

	try {
		// Verify and decode the token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// Extract user information from the decoded token
		const isAdmin = decodedToken.isAdmin;
        console.log(decodedToken);

		// Check if the user has admin role
		if (!isAdmin) {
			return res.status(403).json({
				error: "Acesso proibido. Esta rota é restrita aos administradores.",
			});
		}

		// Call the next middleware function
		next();
	} catch (error) {
		// Handle token verification errors
		return res
			.status(401)
			.json({ error: "Token de autenticação inválido." });
	}
};

module.exports = isAdmin;
>>>>>>> ec00b737a453fb0f99a6c2e3cd2185bf6cc9e969
