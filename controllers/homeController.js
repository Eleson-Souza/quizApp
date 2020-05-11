const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homeQuiz', { player: req.session.player });
});

module.exports = router;