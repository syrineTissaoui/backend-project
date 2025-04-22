// models/skinType.js
const mongoose = require('mongoose');

const skinTypeSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('SkinType', skinTypeSchema);
