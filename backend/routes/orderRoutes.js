const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders);
router.get('/all', adminMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/status', adminMiddleware, orderController.updateOrderStatus);

module.exports = router;
