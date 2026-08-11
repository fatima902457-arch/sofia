const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', adminMiddleware, userController.getUsers);
router.get('/favorites', authMiddleware, userController.getFavorites);
router.get('/:id', adminMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.put('/:id/role', adminMiddleware, userController.updateUserRole);
router.post('/change-password', authMiddleware, userController.changePassword);
router.delete('/:id', adminMiddleware, userController.deleteUser);
router.post('/favorites/:foodId', authMiddleware, userController.addFavorite);
router.delete('/favorites/:foodId', authMiddleware, userController.removeFavorite);

module.exports = router;
