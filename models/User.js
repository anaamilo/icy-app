const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

  name: String,
  email: String,
  age: Number,
  addres: Object,

});

module.exports = mongoose.model('User', UserSchema);
