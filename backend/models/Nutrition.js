const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snacks']
  },
  foodItems: [{
    itemName: {
      type: String,
      required: [true, 'Please enter the food item name']
    },
    quantity: {
      type: Number
    },
    calories: {
      type: Number
    },
    macros: {
      carbs: {
        type: Number
      },
      proteins: {
        type: Number
      },
      fats: {
        type: Number
      }
    }
  }],
  logDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Nutrition', nutritionSchema);