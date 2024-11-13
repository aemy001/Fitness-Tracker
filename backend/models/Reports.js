const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportType: {
    type: String,
    enum: ['fitness progress', 'nutrition data']
  },
  data: {
    type: Object
  },
  format: {
    type: String,
    enum: ['PDF', 'CSV']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
