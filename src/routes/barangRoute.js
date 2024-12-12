const express = require('express');
const auth = require('../middleware/auth');
const barangController = require('../controllers/barangController');
const Router = express.Router();

Router.get('/barang',auth,barangController.index );

module.exports = Router;