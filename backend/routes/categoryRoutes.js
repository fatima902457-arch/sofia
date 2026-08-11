const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', categoryController.getAllCategories);
router.post('/', adminMiddleware, categoryController.createCategory);
router.put('/:id', adminMiddleware, categoryController.updateCategory);
router.delete('/:id', adminMiddleware, categoryController.deleteCategory);

module.exports = router;
