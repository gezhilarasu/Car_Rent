const reviewSchema = new mongoose.Schema({
    rental_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    review_date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Review', reviewSchema);
  