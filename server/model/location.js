const locationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location_name: String,
    address: String,
    city: String,
    state: String,
    postal_code: String,
    contact_number: String
  });
  
  module.exports = mongoose.model('Location', locationSchema);
  