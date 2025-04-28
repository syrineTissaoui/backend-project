const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  date: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Processing', 'Shipped', 'Completed', 'Pending', 'Delivered', 'Canceled']
  },
  total: { type: Number, required: true },
  productIds: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
