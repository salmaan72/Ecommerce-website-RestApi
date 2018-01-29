const express = require('express');
var routes = express();
const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');
const instantiateStoreModel = require('./middleware/instantiateStoreModel');

routes.post('/signup',userController.signup);

routes.post('/login',userController.login);

routes.get('/dashboard',userController.dashboard);

routes.get('/logout',userController.logout);

routes.post('/insertproduct',instantiateStoreModel.instantiate, productController.insertProduct);

module.exports = routes;
