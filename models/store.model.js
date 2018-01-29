"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  electronics:{
    mobiles: [Schema.ObjectId],
    laptops: [Schema.ObjectId],
    cameras: [Schema.ObjectId]
  },
  appliances: {
    televisions: [Schema.ObjectId],
    airconditioners: [Schema.ObjectId],
    refridgerators: [Schema.ObjectId]
  },
  clothing: {
    men: [Schema.ObjectId],
    women: [Schema.ObjectId],
    kids: [Schema.ObjectId]
  },
  storeId: String
});

const storeModel = mongoose.model('storeModel',storeSchema);

module.exports = storeModel;
