const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const { userId, name, exercises, category, tags, caloriesBurned, date } = req.body;

    const workout = new Workout({
      userId,
      name,
      exercises,
      category,
      tags,
      caloriesBurned, 
      date 
    });

    await workout.save();
    res.status(201).json({ message: 'Workout created successfully', workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Get all workouts for a user
exports.getWorkoutsByUserId = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout updated successfully', workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
