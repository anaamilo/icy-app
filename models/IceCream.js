const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const IceCreamSchema = new Schema({
  name: { type: String },
  flavour: { type: String },
  description: { type: String },
  hasLactose: { type: Boolean, required: true },
  hasEgg: { type: Boolean, required: true },
  hasNuts: { type: Boolean, required: true },
  picPath: { type: String },
  picName: { type: String } 
});

module.exports = mongoose.model('IceCream', IceCreamSchema);
