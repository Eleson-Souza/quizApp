const sequelize = require('sequelize');
const connection = require('../database/connection');
const Player = require('../models/Player');

const Result = connection.define('results', {
    acertos: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    questoes: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    aproveitamento: {
        type: sequelize.FLOAT,
        allowNull: false
    }
});

Result.belongsTo(Player); // Um resultado pertence a um jogador.

//Result.sync({force: true});

module.exports = Result;