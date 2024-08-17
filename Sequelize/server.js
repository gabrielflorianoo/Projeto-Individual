const { Sequelize } = require('sequelize');

const databaseURL = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseURL);

module.exports = sequelize;
