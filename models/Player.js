const sequelize = require('sequelize');
const connection = require('../database/connection');

const Player = connection.define('player', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Player.sync({force: false});

module.exports = Player;