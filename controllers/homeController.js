const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.player) {
        res.render('homeQuiz', { player: req.session.player });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;