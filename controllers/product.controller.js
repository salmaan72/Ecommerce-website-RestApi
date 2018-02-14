"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('./../models/user.model');
const responseGenerator = require('./../libs/responseGenerator');
const config = require('./../libs/config');
const verifyToken = require('./../middleware/verifyToken');
const productModel = require('./../models/product.model');
const storeModel = require('./../models/store.model');

let productController = {};

// function to insert a product
productController.insertProduct = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    if(req.body.name !== undefined && req.body.category !== undefined && req.body.subcategory !== undefined && req.body.details.price !== undefined){
      let newProduct = new productModel({
        name: req.body.name,
        category: req.body.category,
        subcategory: req.body.subcategory,
        details: {
          specs: req.body.details.specs,
          price: req.body.details.price
        }
      });
      newProduct.save().then(function(product){
        storeModel.findById(res.mydata, function(err, store){
          store[product.category][product.subcategory].push(product._id);
          store.save().then(function(store){
            let response = responseGenerator.respGen(false,'saved successfully',200,null);
            res.status(200).send(response);
          });
        });
      }).catch(function(err){
        res.send(err);
      });
    }
    else{
      let response = responseGenerator.respGen(true, 'some field is empty', 500, null);
      res.send(response);
    }
  });
}

// display all the products
productController.allProducts = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    productModel.find({}).then(function(products){
      let response = responseGenerator.respGen(false,'request successful',200,products);
      res.status(200).send(response);
    }).catch(function(err){
      let response = responseGenerator.respGen(true,'error: '+err,500,null);
      res.status(500).send(response);
    });
  });
}

//display a particular product by passing its id
productController.particularProduct = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    productModel.findById(req.query.id, function(err,product){
      if(err){
        let response = responseGenerator.respGen(true,'error: '+err,500,null);
        res.send(response);
      }
      let response = responseGenerator.respGen(false, 'request successful',200,product);
      res.send(response);
    });
  });
}

// delete a particular product
productController.deleteProduct = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    productModel.findById(req.query.id, function(err,product){
      storeModel.findById(res.mydata,function(err,store){
        store[product.category][product.subcategory].splice(store[product.category][product.subcategory].indexOf(product._id),1);
        store.save(function(err){
          product.remove(function(err){
            if(err){
              res.send(err);
            }
            let response = responseGenerator.respGen(false,'product deleted successfully',200,null);
            res.send(response);
          });
        });
      });

    });
  });
}

// function to check insertion of unique items in specs array of productModel
Array.prototype.unique = function() {
    let wd = this.concat();
    for(var i=0; i<wd.length; ++i) {
        for(var j=i+1; j<wd.length; ++j) {
            if(wd[i] === wd[j])
                wd.splice(j--, 1);
        }
    }
    return wd;
};
// edit a particular product
productController.editProductInfo = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    productModel.findById(req.query.id, function(err,product){
      if(err){
        let response = responseGenerator.respGen(true,'error: '+err,500,null);
        res.send(response);
      }

      for(let key in req.body){
        if(key === "name"){
          product.name = req.body.name;
        }
        else if(key === "category"){
          product.category = req.body.category;
        }
        else if(key === 'subcategory'){
          product.subcategory = req.body.subcategory;
        }
        else if(key === 'details'){
          for(let key2 in req.body.details){
            if(key2 === 'specs'){
              product.details.specs = product.details.specs.concat(req.body.details.specs).unique();
            }
            else if(key2 === 'price'){
              product.details.price = req.body.details.price;
            }
          }
        }
      }
      product.save(function(err){
        if(err){
          let response = responseGenerator.respGen(true,'error: '+err,500,null);
          res.send(response);
        }
        let response = responseGenerator.respGen(false,'product info updated successfully',200,product);
        res.send(response);
      });
    });
  });
}

module.exports = productController;
