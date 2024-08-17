const { DataTypes } = require('sequelize');
const sequelize = require('./server.js');

const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
    },
    {
        tableName: 'product', // Nome da tabela no banco de dados
        timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    }
);

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    User,
    Order,
    Product,
};
