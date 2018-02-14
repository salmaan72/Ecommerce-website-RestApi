const express = require('express');
var routes = express();
const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller');
const instantiateStoreModel = require('./middleware/instantiateStoreModel');
const cartController = require('./controllers/cart.controller');
const confirmpass_verify = require('./middleware/confirmpass_verify');
const forgotPassword = require('./controllers/email.controller');

// signup to the website
routes.post('/signup', confirmpass_verify.confirmpass, userController.signup);

//login
routes.post('/login',userController.login);

// user dashboard
routes.get('/dashboard',userController.dashboard);

// logout from the session
routes.get('/logout',userController.logout);

// insert a product into the website's database
routes.post('/insertproduct',instantiateStoreModel.instantiate, productController.insertProduct);

// display all products in the database
routes.get('/allproducts', productController.allProducts);

// display a particular product
routes.get('/oneproduct',productController.particularProduct);

// delete a particular product from the website
routes.post('/deleteproduct',instantiateStoreModel.instantiate, productController.deleteProduct);

// edit a particular product's info
routes.put('/editproduct', productController.editProductInfo);

// add product to the user cart
routes.post('/addtocart', cartController.addToCart);

// remove a product from the user cart
routes.post('/removefromcart', cartController.removeFromCart);

// recover password through email
routes.post('/forgotpassword',forgotPassword.sendEmail);

module.exports = routes;
