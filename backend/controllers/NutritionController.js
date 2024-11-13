const Nutrition = require('../models/Nutrition');


exports.createNutrition = async (req, res) => {
  try {
    const nutrition = new Nutrition({
      userId: req.body.userId,
      mealType: req.body.mealType,
      foodItems: req.body.foodItems,
      logDate: req.body.logDate
    });
    await nutrition.save();
    res.status(201).json({ message: 'Nutrition log created successfully', nutrition });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all nutrition logs for a user
exports.getNutritionByUserId = async (req, res) => {
  try {
    const nutritionLogs = await Nutrition.find({ userId: req.params.userId });
    res.status(200).json(nutritionLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a nutrition log by ID
exports.getNutritionById = async (req, res) => {
  try {
    const nutrition = await Nutrition.findById(req.params.id);
    if (!nutrition) {
      return res.status(404).json({ error: 'Nutrition log not found' });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a nutrition log
exports.updateNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nutrition) {
      return res.status(404).json({ error: 'Nutrition log not found' });
    }
    res.status(200).json({ message: 'Nutrition log updated successfully', nutrition });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a nutrition log
exports.deleteNutrition = async (req, res) => {
  try {
    await Nutrition.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Nutrition log deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
