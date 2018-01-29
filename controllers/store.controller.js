"use strict";

const productController = require('./product.controller');
const storeModel = require('./../models/store.model');
let responseGenerator = require('./../libs/responseGenerator');

let storeController = {};

storeController.storeProduct = function(product, store){

  storeModel.findById(store, function(err, foundStore){
    //console.log(foundStore);
    if(product.category === "electronics"){
      if(product.subcategory === "mobiles"){
        foundStore.electronics.mobiles.push(product._id);
      }
      else if(product.subcategory === "laptops"){
        foundStore.electronics.laptops.push(product._id);
      }
      else if(product.subcategory === "cameras"){
        foundStore.electronics.cameras.push(product._id);
      }
    }
    else if(product.category === "appliances"){
      if(product.subcategory === "televisions"){
        foundStore.appliances.televisions.push(product._id);
      }
      else if(product.subcategory === "airconditioners"){
        foundStore.appliances.airconditioners.push(product._id);
      }
      else if(product.subcategory === "refridgerators"){
        foundStore.appliances.refridgerators.push(product._id);
      }
    }
    else if(product.category === "clothing"){
      if(product.subcategory === "men"){
        foundStore.clothing.men.push(product._id);
      }
      else if(product.subcategory === "women"){
        foundStore.clothing.women.push(product._id);
      }
      else if(product.subcategory === "kids"){
        foundStore.clothing.kids.push(product._id);
      }
    }
    foundStore.save(function(err){
      if(err){
        let response = responseGenerator.respGen(true, 'error: '+err, 500, null);
        res.send(response);
      }
    });
  });
  return true
}

module.exports = storeController;
