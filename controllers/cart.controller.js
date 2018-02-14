"use strict"

const verifyToken = require('./../middleware/verifyToken');
const userModel = require('./../models/user.model');
const productModel = require('./../models/product.model');
const responseGenerator = require('./../libs/responseGenerator');
const mongoose = require('mongoose');

let cartController = {};

// function to add items to the cart
cartController.addToCart = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie, function(authData){
    userModel.findOne({"email":authData.user}, function(err,userFound){
      if(err){
        let response = responseGenerator.respGen(true,'error: '+err,500,null);
        res.send(response);
      }
      productModel.findById(req.query.product_id, function(err,product){
        if(err){
          let response = responseGenerator.respGen(true,'error: '+err,500,null);
          res.send(response);
        }

        userFound.cart.push(product._id);

        userFound.save(function(err){
          if(err){
            let response = responseGenerator.respGen(true, 'error: '+err, 500, null);
            res.send(response);
          }
          else{
            let response = responseGenerator.respGen(false,'product added to cart',200,null);
            res.send(response);
          }
        });

      });
    });
  });
}

// function to remove an item from the cart
cartController.removeFromCart = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie, function(authData){
    userModel.findOne({"email":authData.user}, function(err,userFound){
      if(err){
        let response = responseGenerator.respGen(true,'error: '+err,500,null);
        res.send(response);
      }
      userFound.cart.splice(userFound.cart.indexOf(mongoose.Schema.ObjectId(req.query.product_id)),1);
      userFound.save(function(err){
        if(err){
          let response = responseGenerator.respGen(true, 'error: '+err, 500, null);
          res.send(response);
        }
        else{
          let response = responseGenerator.respGen(false,'product deleted from cart',200,null);
          res.send(response);
        }
      });
    });
  });
}

module.exports = cartController;
