const { User } = require('../Sequelize/Models.js');
const bcrypt = require('bcryptjs');

const createAdmin = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const existingAdmin = await User.findOne({
            where: { email, isAdmin: true },
        });

        if (existingAdmin) {
            return res
                .status(400)
                .json({ error: 'Este usuário já é um administrador.' });
        }

        const newAdmin = await User.create({
            name: nome,
            email: email,
            pass: await bcrypt.hash(senha, 10),
            isAdmin: true,
        });

        if (!newAdmin) {
            return res.status(500).json({
                error: 'Erro ocorreu ao criar administrador.',
            });
        }

        return res
            .status(201)
            .json({ message: 'Novo administrador criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar administrador:', error);
        return res.status(500).json({
            error: 'Erro ao criar administrador. Por favor, tente novamente mais tarde.',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const userToDelete = await User.findOne({
            where: { id: userId, isAdmin: false },
        });

        if (!userToDelete) {
            return res.status(404).json({
                error: 'Usuário não encontrado ou é um administrador.',
            });
        }

        await User.destroy({ where: { id: userId } });

        return res
            .status(200)
            .json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({
            error: 'Erro ao excluir usuário. Por favor, tente novamente mais tarde.',
        });
    }
};

module.exports = {
    createAdmin,
    deleteUser,
};
