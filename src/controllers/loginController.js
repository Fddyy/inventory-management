const cekUser = require('../models/loginModel')

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isAuthenticated = await cekUser(email, password);
        if (isAuthenticated) {
            req.session.isAuthenticated = true;
            req.session.message = { 
                text: "Login berhasil!", 
                type: "success"
            };
            res.redirect('/dashboard');
        } else {
            req.session.message = { 
                text: "Email atau password salah.", 
                type: "danger"
            };
            res.redirect('/login');
        };
    } catch (error) {
        console.error(error);
        res.status(500).send('<h2>Error 500 </br>Terjadi kesalahan pada server</h2>');
    };
};  

module.exports = userLogin;