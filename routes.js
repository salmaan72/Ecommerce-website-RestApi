const express = require('express');
var routes = express();
const userController = require('./controllers/user.controller');

routes.post('/signup',userController.signup);

routes.post('/login',userController.login);

routes.get('/dashboard',userController.dashboard);

routes.get('/logout',userController.logout);

module.exports = routes;
