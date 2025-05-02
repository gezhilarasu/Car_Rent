const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: 
  {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  phone_number:{
    type: String,
    required: true,
    trim: true
  },
  address:{
    type: String,
    required: true,
    trim: true
  },
  role_type: {
    type: String,
    enum: ['user', 'admin'],
    default:'user'
  },

  otp:{
    type: String,
    default: null
  },

  otp_expiry:{
    type:Date,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);
