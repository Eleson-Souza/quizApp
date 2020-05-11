const express = require('express');
const router = express.Router();
const Result = require('../models/Results');
const Player = require('../models/Player');

router.post('/resultado', (req, res) => {
    let acertos = req.body.acertos;
    let quantQuestoes = req.body.numQuestoes;
    let aproveitamento = ((acertos / quantQuestoes) * 100).toFixed(2);
    let idUsuario = req.body.idUsuario;

    Result.findOne({ // Verifica se o usuario já possui alguma pontuação daquele questionário salvo no banco.
        where: {
            playerId: idUsuario
        }
    }).then(result => {
        if(result) { // Caso seja encontrado algum resultado desse usuario
            if(aproveitamento > result.aproveitamento) { // verifica se obteve uma melhor pontuação que anteriormente, se sim modifica a atual.

                Result.update({ // altera registro existente.
                    acertos: acertos,
                    questoes: quantQuestoes,
                    aproveitamento: aproveitamento,
                    playerId: idUsuario
                }, {
                    where: {
                        playerId: idUsuario
                    }
                });           
            }
        } 
        
        else { // Caso o usuário não tenha nenhum registro de resultado, cria-se um novo.
            Result.create({
                acertos: acertos,
                questoes: quantQuestoes,
                aproveitamento: aproveitamento,
                playerId: idUsuario
            });
        }

        Player.findByPk(idUsuario).then(player => {
            res.render('results/resultado', { // renderiza a view resultado, passando as informações.
                acertos: acertos, 
                quantQuestoes: quantQuestoes,
                aproveitamento: aproveitamento,
                idUsuario: idUsuario,
                player: player
            });
        });
    });
});

router.get('/ranking', (req, res) => {
    Result.findAll({
        order: [
            ['aproveitamento', 'desc']
        ],
        include: [{model: Player}],
        limit: 10
    }).then(resultado => {
        res.render('results/ranking', { resultado });
        //res.json(resultado);
    });
});

module.exports = router;