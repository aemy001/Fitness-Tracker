const express = require('express');
const router = express.Router();
const progressController = require('../controllers/ProgressController');

// Create a new progress entry
router.post('/progress', progressController.createProgress);

// Get all progress entries for a user
router.get('/progress/user/:userId', progressController.getProgressByUserId);

// Get a progress entry by ID
router.get('/progress/:id', progressController.getProgressById);

// Update a progress entry
router.put('/progress/:id', progressController.updateProgress);

// Delete a progress entry
router.delete('/progress/:id', progressController.deleteProgress);

module.exports = router;