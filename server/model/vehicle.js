const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({

    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },

    vehicle_type: {
      type: String,
      enum: ['car', 'bike']
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'maintenance']
    },
    registration_number:{
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    brand:{
      type: String,
      required: true,
      trim: true
    },
    model:{
      type: String,
      required: true,
      trim: true
    },
    full_day_rent_price:{
      type: Number,
      required: true
    },
    city:{
      type: String,
      required: true,
      trim: true
    },
    state:{
      type: String,
      required: true,
      trim: true
    },  
    postal_code:{
      type: String,
      required: true,
      trim: true
    },
    contact_number:{
      type: String,
      required: true,
      trim: true
    },
    image_url: {
      type: String,
      required: true,
      trim: true
    }
    
  });
  module.exports = mongoose.model('Vehicle', vehicleSchema);
  