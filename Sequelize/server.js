<<<<<<< HEAD
const { Sequelize } = require('sequelize');

// Definir a URL de conexão com o banco de dados
const databaseURL = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseURL);

module.exports = sequelize;
=======
const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseURL = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseURL, {
    dialect: 'mysql',
});

module.exports = sequelize;
>>>>>>> ec00b737a453fb0f99a6c2e3cd2185bf6cc9e969
