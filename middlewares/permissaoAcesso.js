function verificarSessao(req, res, next) {
    if(req.session.player) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = verificarSessao;