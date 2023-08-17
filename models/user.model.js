const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const user = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }

}, { freezeTableName: true })

module.exports = user;