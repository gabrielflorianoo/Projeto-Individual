const { Sequelize } = require('sequelize');

// Definir a URL de conexão com o banco de dados
const databaseURL = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseURL);

module.exports = sequelize;
