const express = require('express');
var routes = express();
const userController = require('./controllers/user.controller');

routes.post('/signup',userController.signup);

routes.post('/login',userController.login);

module.exports = routes;
