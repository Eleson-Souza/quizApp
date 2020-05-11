const express = require('express');
const router = express.Router();
const Category = require('../models/CategoryQuestion');
const connection = require('../database/connection');
const slugify = require('slugify');
const permissaoAcesso = require('../middlewares/permissaoAcesso');

router.get('/categorias', permissaoAcesso, (req, res) => {
    connection.query('select * from category_questions order by id desc', { model: Category }).then((categories) => {
        res.render('category/index', { categories });
    });
});

router.get('/categoria/nova', permissaoAcesso, (req, res) => {
    res.render('category/new');
});

router.post('/categoria/nova', (req, res) => {
    var name = req.body.name;

    if(name) {
        Category.create({
            nome: name,
            slug: slugify(name)
        }).then(() => {
            res.redirect('/categorias');
        });
    } else {
        res.redirect('/categoria/nova');
    }
});

router.post('/categoria/delete', permissaoAcesso, (req, res) => {
    var id = req.body.id;
    connection.query('delete from category_questions where id = ?', {
        replacements: [id]
    }).then(() => {
        res.redirect('/categorias');
    });
});

router.get('/categoria/update/:id', permissaoAcesso, (req, res) => {
    var id = req.params.id;
    connection.query('select * from category_questions where id = :id', {
        replacements: { id: id },
        model: Category
    }).then(category => {
        res.render('category/edit', { category });
    });
});

router.post('/categoria/update', permissaoAcesso, (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var slug = slugify(req.body.name);
    connection.query('update category_questions set nome = ?, slug = ?, updatedAt = now() where id = ?', {
        replacements: [name, slug, id]
    }).then(() => {
        res.redirect('/categorias');
    });
});

module.exports = router;