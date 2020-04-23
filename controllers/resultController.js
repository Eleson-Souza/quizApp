const express = require('express');
const router = express.Router();
const Result = require('../models/Results');
const Player = require('../models/Player');

router.get('/resultado/:id/:acertos/:quantQuestoes', (req, res) => {
    let acertos = req.params.acertos;
    let quantQuestoes = req.params.quantQuestoes;
    let aproveitamento = ((acertos / quantQuestoes) * 100).toFixed(2);
    let idUsuario = req.params.id;

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

        res.render('resultado', { // renderiza a view resultado, passando as informações.
            quantAcertos: acertos, 
            quantQuestoes: quantQuestoes,
            aproveitamento: aproveitamento,
            idUsuario: idUsuario
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
        res.render('ranking', { resultado });
    });
});

module.exports = router;