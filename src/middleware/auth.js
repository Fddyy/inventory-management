const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('Session:', req.session.isAuthenticated);
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
}

module.exports = isAuthenticated;