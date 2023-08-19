const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const detail = db.define('detail_movie_character', {
    detail_movie_character_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, { freezeTableName: true, timestamps: false });

module.exports = detail;