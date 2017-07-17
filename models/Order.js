const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({

  creator: {
    ref: User
  },
  composition: {
    type: ""
  },
  product1: {
    ref: IceCream
  },
  product2: {
    ref: IceCream
  },
  product3: {
    ref: IceCream
  },
  totalPrice: { }

});

module.exports = mongoose.model('Order', OrderSchema);
