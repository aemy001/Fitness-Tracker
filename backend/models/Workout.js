const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Please enter the workout name']
  },
  exercises: [{
    exerciseName: {
      type: String,
      required: [true, 'Please enter the exercise name']
    },
    sets: {
      type: Number,
      min: [1, 'Sets must be at least 1']
    },
    reps: {
      type: Number,
      min: [1, 'Reps must be at least 1']   
    },
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative'] 
    },
    notes: {
      type: String
    }
  }],
  category: {
    type: String
  },
  tags: [{
    type: String
  }],
  date: { 
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now 
  },
  caloriesBurned: { 
    type: Number,
    min: [0, 'Calories burned cannot be negative']
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Workout', workoutSchema);
