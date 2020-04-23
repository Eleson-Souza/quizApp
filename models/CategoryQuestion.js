const sequelize = require('sequelize');
const connection = require('../database/connection');

const Category = connection.define('category_questions', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    }
});

//Category.sync({force: true});

module.exports = Category;