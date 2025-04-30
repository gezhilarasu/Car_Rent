const carSchema = new mongoose.Schema({
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    seating_capacity: Number,
    fuel_type: {
      type: String,
      enum: ['petrol', 'diesel', 'electric', 'hybrid']
    }
  });
  
  module.exports = mongoose.model('Car', carSchema);
  