const bcrypt = require('bcryptjs');

// Configurar o Sequelize
const { sequelize } = require('./Sequelize/server.js');
const { User } = require('./Sequelize/Models.js');

// Dados do administrador padrão
const DEFAULT_ADMIN = {
    name: process.env.ADMIN_USER,
    pass: process.env.ADMIN_PASS,
    email: process.env.ADMIN_EMAIL,
    isAdmin: true,
};

async function createDefaultAdmin() {
    try {
        // Verificar se já existe um administrador
        const existingAdmin = await User.findOne({
            where: { isAdmin: true },
        });

        if (existingAdmin) {
            console.log('Administrador padrão já existe.');
            return;
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.pass, 10);

        // Criar o administrador padrão
        await User.create({
            name: DEFAULT_ADMIN.name,
            email: DEFAULT_ADMIN.email,
            pass: hashedPassword,
            isAdmin: DEFAULT_ADMIN.isAdmin,
        });

        console.log('Administrador padrão criado com sucesso.');
    } catch (error) {
        console.error('Erro ao criar o administrador padrão:', error);
    } finally {
        await sequelize.close();
    }
}

module.exports = createDefaultAdmin;
