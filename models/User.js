const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

  name: String,
  email: String,
  age: Number,
  addres: Object,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
   }

});

module.exports = mongoose.model('User', UserSchema);
