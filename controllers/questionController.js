const express = require('express');
const router = express.Router();
const Questions = require('../models/Questions');
const Category = require('../models/CategoryQuestion');

router.get('/perguntas', function(req, res) {
    Questions.findAll({
        include: [{model: Category}],
        order: [
            ['id', 'desc']
        ]
    }).then(questions => {
        res.render('question/index', { questions });
        //res.json(questions);
    });
});

router.get('/pergunta/nova', (req, res) => {
    Category.findAll().then(categories => {
        res.render('question/new', { categories });
    });
});

router.post('/pergunta/nova', (req, res) => {
    var question = req.body.question;
    var altA = req.body.altA;
    var altB = req.body.altB;
    var altC = req.body.altC;
    var altD = req.body.altD;
    var altCorreta = req.body.alt_correta;
    var category = req.body.category;

    if(question && altB && altB && altC && altD && altCorreta && category) {
        Questions.create({
            pergunta: question,
            alternativa_a: altA,
            alternativa_b: altB,
            alternativa_c: altC,
            alternativa_d: altD,
            alternativa_correta: altCorreta,
            categoryQuestionId: category
        }).then(() => {
            res.redirect('/perguntas');
        }).catch(error => {
            res.redirect('/pergunta/nova');
            console.log(error);
        });
    }
});

router.post('/pergunta/delete', (req, res) => {
    var id = req.body.id;

    Questions.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/perguntas');
    });
});

router.get('/pergunta/update/:id', (req, res) => {
    var id = req.params.id;
    Questions.findByPk(id).then(question => {
        Category.findAll().then(categories => {
            res.render('question/edit', { question, categories });
        });
    });
});

router.post('/pergunta/update/:id', (req, res) => {
    var id = req.params.id;
    var question = req.body.question;
    var altA = req.body.altA;
    var altB = req.body.altB;
    var altC = req.body.altC;
    var altD = req.body.altD;
    var altCorreta = req.body.altCorreta;
    var categoryId = req.body.category;
    Questions.update({
        pergunta: question,
        alternativa_a: altA,
        alternativa_b: altB,
        alternativa_c: altC,
        alternativa_d: altD,
        alternativa_correta: altCorreta,
        categoryQuestionId: categoryId
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/perguntas');
    });
});

module.exports = router;