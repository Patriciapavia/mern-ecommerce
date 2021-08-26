import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';

const OrderScreen = ({ match }) => {
	const dispatch = useDispatch();
	const orderId = match.params.id;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	useEffect(() => {
		if (!order || order._id !== orderId) {
			dispatch(getOrderDetails(orderId));
		}
	}, [order, orderId]);

	if (!loading) {
		// calculate price
		const addDecimals = (num) => {
			return Math.round((num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<React.Fragment>
			<h1>Order{order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<p>
								<h2>Shipping</h2>
								<strong>Name: </strong>
								{order.user.name}&nbsp;&nbsp;
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address},{order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>
							{order.isDeliverd ? (
								<Message variant='success'>
									Deliverd on {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not delivered</Message>
							)}
						</ListGroupItem>
						<ListGroupItem>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.payAt}</Message>
							) : (
								<Message variant='danger'>Not paid</Message>
							)}
						</ListGroupItem>
						<ListGroupItem>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Order Summary</h2>
						</ListGroupItem>
						<ListGroupItem>
							<Row>
								<Col>items</Col>
								<Col>${order.itemsPrice}</Col>
							</Row>
						</ListGroupItem>
						<ListGroupItem>
							<Row>
								<Col>Shipping</Col>
								<Col>${order.shippingPrice}</Col>
							</Row>
						</ListGroupItem>
						<ListGroupItem>
							<Row>
								<Col>Tax</Col>
								<Col>${order.taxPrice}</Col>
							</Row>
						</ListGroupItem>
						<ListGroupItem>
							<Row>
								<Col>Total</Col>
								<Col>${order.totalPrice}</Col>
							</Row>
						</ListGroupItem>
					</ListGroup>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default OrderScreen;
