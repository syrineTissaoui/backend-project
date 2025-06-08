const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true, // This is okay
  },
  name: String,
  email: String,
  subject: String,
  message: String,
  archived: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  replies: [
    {
      sender: String,
      content: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Message', messageSchema);
