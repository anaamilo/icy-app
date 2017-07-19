const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  address: Object,
  isAdmin: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', UserSchema);
