const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/NutritionController'); 

router.post('/', nutritionController.createNutrition);
router.get('/user/:userId', nutritionController.getNutritionByUserId);
router.get('/:id', nutritionController.getNutritionById);
router.put('/:id', nutritionController.updateNutrition);
router.delete('/:id', nutritionController.deleteNutrition);

module.exports = router;