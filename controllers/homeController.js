const express = require('express');
const router = express.Router();
const permissaoAcesso = require('../middlewares/permissaoAcesso');

router.get('/', permissaoAcesso, (req, res) => {
    res.render('homeQuiz', { player: req.session.player });
});

module.exports = router;