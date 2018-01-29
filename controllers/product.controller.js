"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('./../models/user.model');
const responseGenerator = require('./../libs/responseGenerator');
const config = require('./../libs/config');
const verifyToken = require('./../middleware/verifyToken');
const productModel = require('./../models/product.model');
const storeController = require('./store.controller');

let productController = {};

productController.insertProduct = function(req,res){
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
      if(storeController.storeProduct(product,res.locals.store)){
        let response = responseGenerator.respGen(false,'saved successfully',200,null);
        res.send(response);
      }
    });
  }
  else{
    let response = responseGenerator.respGen(true, 'some field is empty', 500, null);
    res.send(response);
  }
}

module.exports = productController;
