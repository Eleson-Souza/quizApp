const sequelize = require('sequelize');

const connection = new sequelize('quiz_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;