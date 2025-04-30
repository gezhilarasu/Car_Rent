const rentalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    rental_start_datetime: Date,
    rental_end_datetime: Date,
    number_of_days: Number,
    total_amount: Number,
    status: {
      type: String,
      enum: ['booked', 'active', 'completed', 'cancelled']
    }
  });
  
  module.exports = mongoose.model('Rental', rentalSchema);
  