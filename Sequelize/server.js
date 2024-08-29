const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseURL = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseURL, {
    dialect: 'mysql',
});

module.exports = sequelize;
