const express = require('express');

const Router = express.Router();

Router.get('/', (req,res)=> {
    res.render('index.ejs',{ 
        message:{
        text: '',
        type: ''
        },
        title: 'Home'
    });
});

module.exports = Router;