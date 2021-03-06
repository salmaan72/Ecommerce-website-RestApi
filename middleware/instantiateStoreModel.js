"use strict";

const mongoose = require('mongoose');
const storeModel = require('./../models/store.model');
const verifyToken = require('./../middleware/verifyToken');
let responseGenerator = require('./../libs/responseGenerator');

let instantiateStoreModel = {};

instantiateStoreModel.instantiate = function(req,res,next){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    mongoose.connection.db.listCollections({name:"storemodels"}).toArray(function(err, arr){
      
      if(arr.length > 0) {
        storeModel.findOne({storeId:"store-456"},function(err,store){
          res.mydata = store._id;
          next();
        });
      }
      else if(arr.length === 0){
        let newstore = new storeModel({
          electronics:{
            mobiles: [],
            laptops: [],
            cameras: []
          },
          appliances: {
            televisions: [],
            airconditioners: [],
            refridgerators: []
          },
          clothing: {
            men: [],
            women: [],
            kids: []
          },
          storeId: "store-456"
        });
        newstore.save().then(function(sr){
          res.mydata = sr._id;
          next();
        });

      }
    });

  });

}

module.exports = instantiateStoreModel;
