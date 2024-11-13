const mongoose = require('mongoose');

const liftingWeightsSchema = mongoose.Schema({
  exerciseName: {
    type: String
  },
  weight: {
    type: Number
  }
}, { _id: false }); 

const progressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weight: {
    type: Number
  },
  caloriesBurned: {
    type: Number,
    required: true,
    min: [0, 'Calories burned must be a non-negative number']
  },
  performanceMetrics: {
    runTime: {
      type: Number
    },
    liftingWeights: [liftingWeightsSchema] 
  },
  logDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);