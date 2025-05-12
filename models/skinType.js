// models/skinType.js
const mongoose = require('mongoose');

const skinTypeSchema = new mongoose.Schema({
   userId: { type: String, required: true, unique: true }, // Optional: you can use auth later
  skinType: { type: String, required: true },
  concerns: [{ type: String }],
  sensitivity: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model('SkinType', skinTypeSchema);
