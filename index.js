const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const connection = require('./database/connection');
const Player = require('./models/Player');
const Questions = require('./models/Questions')
const Resultado = require('./models/Resultado');
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

app.use('/', router);

const server = app.listen(1010, (erro) => {
    if(erro) {
        console.log(`Houve um erro: ${erro}`);
    } else {
        console.log(`Aplicação rodando na porta ${server.address().port}`);
    }
})