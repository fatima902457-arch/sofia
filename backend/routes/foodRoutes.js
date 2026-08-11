const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', foodController.getAllFoods);
router.get('/:id', foodController.getFoodById);
router.post('/', adminMiddleware, foodController.createFood);
router.put('/:id', adminMiddleware, foodController.updateFood);
router.delete('/:id', adminMiddleware, foodController.deleteFood);

module.exports = router;
