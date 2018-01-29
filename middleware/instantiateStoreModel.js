"use strict";

const mongoose = require('mongoose');
const storeModel = require('./../models/store.model');

let instantiateStoreModel = {};

instantiateStoreModel.instantiate = function(req,res,next){
  mongoose.connection.db.listCollections({name: 'storemodels'})
  .next(function(err, collinfo) {
    if (collinfo) {
      storeModel.findOne({storeId:"store-456"},function(err,store){
        res.locals.store = store._id;
      });
    }
    else{
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
      newstore.save();
    }
  });
  next();
}

module.exports = instantiateStoreModel;
