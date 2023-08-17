const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB, process.env.USERDB, process.env.PASSWORDDB || '',{
    host: process.env.HOST,
    dialect: 'mariadb',
    logging: false
}); 

module.exports = db;