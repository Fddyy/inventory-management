const express = require('express');
const auth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');
const Router = express.Router();

Router.get('/dashboard',auth,dashboardController);

module.exports = Router;