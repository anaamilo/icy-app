const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const IceCreamSchema = new Schema({
  flavour: { type: String, required: true },
  description: String,
  hasLactose: { type: Boolean, required: true },
  hasEgg: { type: Boolean, required: true },
  hasNuts: { type: Boolean, required: true }
});

module.exports = mongoose.model('IceCream', IceCreamSchema);
