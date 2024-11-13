const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');

router.post('/', foodItemController.createFoodItem);
router.get('/', foodItemController.getAllFoodItems);
router.get('/:id', foodItemController.getFoodItemById);
router.put('/:id', foodItemController.updateFoodItem);
router.delete('/:id', foodItemController.deleteFoodItem);

module.exports = router;
