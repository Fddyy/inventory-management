const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Gagal menghancurkan sesi:', err);
            return res.status(500).send('Gagal logout');
        }
        res.clearCookie('connect.sid');
        console.log('logout berhasil!')
        res.render('index.ejs',{ 
            title: "Logout"
        });
    });
};

module.exports = logout;
