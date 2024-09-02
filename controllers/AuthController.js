<<<<<<< HEAD
const { User } = require('../Sequelize/Models.js');
const jwt = require('jsonwebtoken'); // Gerar tokens
const bcrypt = require('bcryptjs'); // Incriptar senhas

// Rota para fazer login
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar se o usuário existe no banco de dados
        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(senha, user.pass);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        // Retornar o token JWT como resposta
        return res.status(200).json({ token: token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({
            error: 'Erro ao fazer login. Por favor, tente novamente mais tarde.',
        });
    }
};

module.exports = {
    login,
};
=======
const { User } = require('../Sequelize/Models.js');
const jwt = require('jsonwebtoken'); // Gerar tokens
const bcrypt = require('bcryptjs'); // Incriptar senhas

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar se o usuário existe no banco de dados
        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verificar se a senha está correta (para contas criptografadas)
        const isPasswordValid = await bcrypt.compare(senha, user.pass);

        // Verificar se a senha coincide diretamente (para contas pré-criadas)
        const isPreCreatedPasswordValid = senha === user.pass;

        // Se ambas as verificações falharem, as credenciais são inválidas
        if (!isPasswordValid && !isPreCreatedPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        // Retornar o token JWT como resposta
        return res.status(200).json({ token: token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({
            error: 'Erro ao fazer login. Por favor, tente novamente mais tarde.',
        });
    }
};

module.exports = {
    login,
};
>>>>>>> ec00b737a453fb0f99a6c2e3cd2185bf6cc9e969
