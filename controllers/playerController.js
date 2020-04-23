const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Questions = require('../models/Questions');

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

module.exports = router;