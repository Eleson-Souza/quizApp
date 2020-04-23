const sequelize = require('sequelize');

const connection = new sequelize('quiz_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;