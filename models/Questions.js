const sequelize = require('sequelize');
const connection = require('../database/connection');
const CategoryQuestion = require('./CategoryQuestion');

const Questions = connection.define('questions', {
    pergunta: {
        type: sequelize.TEXT,
        allowedNull: false
    },
    alternativa_a: {
        type: sequelize.TEXT,
        allowedNull: false
    },
    alternativa_b: {
        type: sequelize.TEXT,
        allowedNull: false
    },
    alternativa_c: {
        type: sequelize.TEXT,
        allowedNull: false
    },
    alternativa_d: {
        type: sequelize.TEXT,
        allowedNull: false
    },
    alternativa_correta: {
        type: sequelize.STRING,
        allowedNull: false
    }
});

CategoryQuestion.hasMany(Questions);
Questions.belongsTo(CategoryQuestion);
//Questions.sync({force: true});

module.exports = Questions;