const Progress = require('../models/Progress');

// Create a new progress entry
exports.createProgress = async (req, res) => {
  try {
    const progress = new Progress({
      userId: req.body.userId,
      weight: req.body.weight,
      caloriesBurned: req.body.caloriesBurned,  
      performanceMetrics: req.body.performanceMetrics,
      logDate: req.body.logDate
    });
    await progress.save();
    res.status(201).json({ message: 'Progress entry created successfully', progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all progress entries for a user
exports.getProgressByUserId = async (req, res) => {
  try {
    const progressEntries = await Progress.find({ userId: req.params.userId });
    res.status(200).json(progressEntries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a progress entry by ID
exports.getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ error: 'Progress entry not found' });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a progress entry
exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!progress) {
      return res.status(404).json({ error: 'Progress entry not found' });
    }
    res.status(200).json({ message: 'Progress entry updated successfully', progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a progress entry
exports.deleteProgress = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Progress entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};