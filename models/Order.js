const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  creator: {type: String},
  composition: {type: String},
  product1: {type: String},
  product2: {type: String},
  product3: {type: String},
  totalPrice: {type: Number},

});

module.exports = mongoose.model('Order', OrderSchema);
