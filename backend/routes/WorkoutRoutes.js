const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/WorkoutController'); 

router.post('/', workoutController.createWorkout);
router.get('/user/:userId', workoutController.getWorkoutsByUserId);
router.get('/:id', workoutController.getWorkoutById);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;