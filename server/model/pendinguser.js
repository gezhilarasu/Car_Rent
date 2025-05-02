// models/pendingUser.js
const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  role_type: { type: String, enum: ['user', 'admin'], default: 'user' },
  otp: { type: String, required: true },
  otp_expiry: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, expires: '10m' } // optional TTL
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
