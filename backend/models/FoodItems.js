const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Please enter the food item name']
  },
  calories: {
    type: Number,
    required: [true, 'Please enter the number of calories']
  },
  macros: {
    carbs: {
      type: Number,
      required: [true, 'Please enter the amount of carbs']
    },
    proteins: {
      type: Number,
      required: [true, 'Please enter the amount of proteins']
    },
    fats: {
      type: Number,
      required: [true, 'Please enter the amount of fats']
    }
  },
  category: {
    type: String,
    required: [true, 'Please enter the category']
  }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
