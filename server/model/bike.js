const mongoose= require('mongoose');
const bikeSchema = new mongoose.Schema({
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    bike_type: {
      type: String,
      enum: ['standard', 'cruiser', 'sports', 'touring']
    }
  });
  
  module.exports = mongoose.model('Bike', bikeSchema);
  