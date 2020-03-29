const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Questions = require('../models/Questions');
const Resultado = require('../models/Resultado');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/novo-usuario', (req, res) => {
    res.render('newUser');
});

router.post('/novo-usuario', (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    Player.create({
        nome: nome,
        email: email,
        senha: senha
    }).then(() => {
        res.redirect('/');
    });
});

router.get('/quiz/:id', (req, res) => {
    let id = req.params.id;

    Player.findOne({
        where: {
            id: id
        }
    }).then(player => {
        res.render('quiz', { player: player });
    });
});

router.post('/quiz', (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    Player.findOne({
        where: {
            email: email,
            senha: senha
        }
    }).then((player) => {
        // Se tiver 1 registro significa que o email e senha estão corretos.
        if(player) {
            setTimeout(() => {
                Questions.findAll({
                    where: {
                        id: 1
                    }
                }).then((question) => {
                    res.render('quiz', { player: player, question: question });
                });
            }, 2000);
        } else {
            res.send('Usuario e/ou senha incorreto(s)!');
        }
    });
});

router.get('/resultado/:id/:acertos/:quantQuestoes', (req, res) => {
    let acertos = req.params.acertos;
    let quantQuestoes = req.params.quantQuestoes;
    let aproveitamento = ((acertos / quantQuestoes) * 100).toFixed(2);
    let idUsuario = req.params.id;

    Resultado.findOne({ // Verifica se o usuario já possui alguma pontuação daquele quetionário salvo no banco.
        where: {
            idPlayer: idUsuario
        }
    }).then(result => {
        if(result) { // Caso seja encontrado algum resultado desse usuario
            if(aproveitamento > result.aproveitamento) { // verifica se obteve uma melhor pontuação que anteriormente, se sim modifica a atual.

                Resultado.update({ // altera registro existente.
                    acertos: acertos,
                    questoes: quantQuestoes,
                    aproveitamento: aproveitamento,
                    idPlayer: idUsuario
                }, {
                    where: {
                        idPlayer: idUsuario
                    }
                });           
            }
        } 
        
        else { // Caso o usuário não tenha nenhum registro de resultado, cria-se um novo.
            Resultado.create({
                acertos: acertos,
                questoes: quantQuestoes,
                aproveitamento: aproveitamento,
                idPlayer: idUsuario
            });
        }

        res.render('resultado', { // renderiza a view resultado, passando as informações.
            quantAcertos: acertos, 
            quantQuestoes: quantQuestoes,
            aproveitamento: aproveitamento,
            idUsuario: idUsuario
        });
    });
});

router.get('/ranking', (req, res) => {
    Resultado.findAll({
        order: [
            ['aproveitamento', 'desc']
        ]
    }).then(resultado => {
        res.render('ranking', { resultado });
    });
});

module.exports = router;