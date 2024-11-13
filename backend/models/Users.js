const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true, 
    required: [true, 'Please enter a username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  email: {
    type: String,
    unique: true, 
    required: [true, 'Please enter an email'] 
  },
  profilePicture: {
    type: String 
  },
  age: {
    type: Number,
    min: 0 // Ensure age is non-negative
  },
  height: {
    type: Number,
    min: 0 // Ensure height is non-negative
  },
  weight: {
    type: Number,
    min: 0 // Ensure weight is non-negative
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now 
  },
  fitnessData: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout' 
  }, {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nutrition'
  }, {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Progress' 
  }]
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
