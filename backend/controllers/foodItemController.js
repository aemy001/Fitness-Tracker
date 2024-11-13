const FoodItem = require('../models/FoodItems');



// Create a new food item
exports.createFoodItem = async (req, res) => {
  try {
    const { itemName, calories, macros, category } = req.body;

   

    const foodItem = new FoodItem({
      itemName,
      calories,
      macros,
      category,
    });

    await foodItem.save();
    res.status(201).json({ message: 'Food item created successfully', foodItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all food items
exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a food item by ID
exports.getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a food item
exports.updateFoodItem = async (req, res) => {
  try {
    const { category } = req.body;

    // Ensure category is valid
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item updated successfully', foodItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a food item
exports.deleteFoodItem = async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
