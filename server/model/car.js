const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    seating_capacity:{
      type: Number,
      min: 1,
      max: 7
    },
    fuel_type: {
      type: String,
      enum: ['petrol', 'diesel', 'electric', 'hybrid']
    }
  });
  
  module.exports = mongoose.model('Car', carSchema);
  