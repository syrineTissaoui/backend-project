const express =require( 'express');
const orderController=require( '../controllers/orderController.js');

const router = express.Router();



// GET all orders
router.get('/', orderController.getAllOrders);

// POST create order
router.post('/', orderController.createOrder);

// PUT update order
router.put('/:id', orderController.updateOrder);
router.get('/seller/:userId', orderController.getSellerOrders);

module.exports = router;
