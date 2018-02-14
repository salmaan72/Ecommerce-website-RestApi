"use strict"

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  details: {
    specs: [String],
    price: String
  }
});

let productModel = mongoose.model('productModel',productSchema);

module.exports = productModel;
