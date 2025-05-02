const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           // 🔁 Assure-toi que ton modèle User est bien nommé ainsi
    required: true
  },
  date: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default:"Processing",
    enum: ['Processing', 'Shipped', 'Completed', 'Pending', 'Delivered', 'Canceled']
  },
  total: { type: Number, required: true },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
