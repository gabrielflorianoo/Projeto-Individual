const { DataTypes } = require('sequelize');
const sequelize = require('./server.js');

const User = sequelize.define(
    'User',
    {
        // Nome do usuário
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Email do usuário
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        // Senha do usuário
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Campo que reflete se usuário é admin ou não
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: 'user', // Nome da tabela no banco de dados
        timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    }
);

const Order = sequelize.define(
    'Order',
    {
        // Quantidade do produto a ser pedido
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Id do comprador do produto
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Id do produto a ser comprado
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'order', // Nome da tabela no banco de dados
        timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    }
);

const Product = sequelize.define(
    'Product',
    {
        // Nome do produto
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Preço de cada produto
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // Id do criador/vendedor do produto
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'product', // Nome da tabela no banco de dados
        timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    }
);

// Relacionamentos
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

Product.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Order,
    Product,
};
