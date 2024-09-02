const { DataTypes } = require('sequelize');
const sequelize = require('./server.js');

/**
 * Modelo Sequelize para a tabela de usuários.
 *
 * @typedef {Object} User
 * @property {string} name - Nome do usuário.
 * @property {string} email - Email do usuário, deve ser único.
 * @property {string} pass - Senha do usuário.
 * @property {boolean} isAdmin - Indica se o usuário é administrador.
 */

/**
 * Modelo Sequelize para a tabela de pedidos.
 *
 * @typedef {Object} Order
 * @property {number} quantity - Quantidade do produto a ser pedido.
 * @property {number} userId - ID do usuário que fez o pedido.
 * @property {number} productId - ID do produto comprado.
 */

/**
 * Modelo Sequelize para a tabela de produtos.
 *
 * @typedef {Object} Product
 * @property {string} name - Nome do produto.
 * @property {number} price - Preço do produto.
 * @property {number} userId - ID do usuário que criou/vendeu o produto.
 */

/**
 * Define o modelo de dados para o usuário.
 * @type {ModelCtor<User>}
 */
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

/**
 * Define o modelo de dados para os pedidos.
 * @type {ModelCtor<Order>}
 */
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

/**
 * Define o modelo de dados para os produtos.
 * @type {ModelCtor<Product>}
 */
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
