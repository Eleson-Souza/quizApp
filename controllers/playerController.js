const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Questions = require('../models/Questions');
const bcrypt = require('bcryptjs');
const permissaoAcesso = require('../middlewares/permissaoAcesso');

router.get('/novo-usuario', (req, res) => {
    res.render('player/newUser');
});

router.post('/novo-usuario', (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    Player.findOne({where: {email: email}}).then((player) => {
        if(player == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(senha, salt);

            Player.create({
                nome: nome,
                email: email,
                senha: hash
            }).then(() => {
                res.redirect('/login');
            });
        } else {
            res.redirect('/novo-usuario');
        }
    });
});

var offset = -1;
router.get('/quiz/:user_id/:question_num', permissaoAcesso, (req, res) => {
    let id = (req.params.user_id).split('-')[1];
    let numQuestion = (req.params.question_num).split('-')[1];

    Player.findOne({
        where: {
            id: id
        }
    }).then(player => {

        offset = numQuestion - 1;

        Questions.findAndCountAll({
            limit: 1,
            offset: offset
        }).then(questions => {

            var next;
            if(offset + 1 >= questions.count) {
                next = false;
            } else {
                next = true;
            }

            var result = {
                question: parseInt(numQuestion),
                next: next,
                questions: questions
            }
            res.render('quiz', { player: player, result: result });
            //res.json(result);
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.senha;

    Player.findOne({
        where: {
            email: email
        }
    }).then((player) => {
        // Se tiver 1 registro significa que o email está corretos.
        if(player) {
            var senhaCorreta = bcrypt.compareSync(password, player.senha);

            if(senhaCorreta) {
                setTimeout(() => {
                    req.session.player = {
                        id: player.id,
                        nome: player.nome,
                        email: player.email
                    }
                    res.render('homeQuiz', { player: req.session.player });         
                }, 1000);
            } else {
                res.send('Senha incorreta!');
            }
        } else {
            res.send('Usuário e/ou senha incorreto(s)!');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.player = undefined;
    res.redirect('/login');
});

module.exports = router;