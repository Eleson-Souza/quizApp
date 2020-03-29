const sequelize = require('sequelize');
const connection = require('../database/connection');

const Resultado = connection.define('results', {
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
    },
    idPlayer: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Resultado.sync({force: false});

module.exports = Resultado;