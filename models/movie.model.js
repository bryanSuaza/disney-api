const { DataTypes } = require('sequelize');
const db = require('../database/connection');

const movie = db.define('movie', {
    movie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },

}, { freezeTableName: true, timestamps: true, paranoid: true });

module.exports = movie;