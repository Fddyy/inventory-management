const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session);
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
}

module.exports = isAuthenticated;