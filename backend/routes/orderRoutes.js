import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc create new order
// @route POST /api/orders
//@ access private

router.post(
	'/',
	protect,
	asyncHandler(async (req, res) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body;

		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error('No oder itemms');
		} else {
			const order = new Order({
				orderItems,
				user: req.user._id,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});
			const createdOrder = await order.save();

			res.status(200).json(createdOrder);
		}
	})
);

// @desc get order by id
// @route GET /api/orders/:id
//@ access private

router.get(
	'/:id',
	protect,
	asyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id).populate(
			'user',
			'name email'
		)
		if(order) {
			res.json(order)
		} else {
			res.status(404)
			throw new Error('Order not found')
		}
	})
);

export default router;
