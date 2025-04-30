const vehicleSchema = new mongoose.Schema({
    vehicle_type: {
      type: String,
      enum: ['car', 'bike']
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'maintenance']
    },
    registration_number: String,
    brand: String,
    model: String,
    full_day_rent_price: Number,
    image_url: String
  });
  module.exports = mongoose.model('Vehicle', vehicleSchema);
  