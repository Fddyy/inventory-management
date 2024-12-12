const express = require('express');
const Router = express.Router();
const userLogin = require('../controllers/loginController');

// Rute untuk halaman login
Router.get('/login',(req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('pages/Login.ejs',{message,title:"Login"});
});

// Rute untuk autentikasi login
Router.post('/login',userLogin);

module.exports = Router;
