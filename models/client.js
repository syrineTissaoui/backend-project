// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loyaltyPoints: Number,
  allergies: [String],
  skinType: { type: String },
  concerns: [String],
  message: String,
  sensitivity:String,
  photo: String // URL de l’image
}, { timestamps: true });

module.exports = mongoose.model('client', ClientSchema);
