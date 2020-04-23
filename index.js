const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const homeController = require('./controllers/homeController');
const playerController = require('./controllers/playerController');
const questionController = require('./controllers/questionController')
const resultController = require('./controllers/resultController');
const categoryQuestionController = require('./controllers/categoryQuestionController');
const app = express();

// Configuração template engine EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexão ao banco realizada com sucesso!');
    })
    .catch((erro) => {
        console.log(`Ocorreu um erro ao se conectar ao banco de dados: ${erro}`);
    });

// Configuração do body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', homeController);
app.use('/', playerController);
app.use('/', questionController);
app.use('/', resultController);
app.use('/', categoryQuestionController);

const server = app.listen(1010, (erro) => {
    if(erro) {
        console.log(`Houve um erro: ${erro}`);
    } else {
        console.log(`Aplicação rodando na porta ${server.address().port}`);
    }
});