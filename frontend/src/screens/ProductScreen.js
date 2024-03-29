import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Message';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match, history }) => {

	const [ qty, setQty ] = useState(1);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);

	const { loading, error, product } = productDetails;

	useEffect(
		() => {
			dispatch(listProductDetails(match.params.id));
		},
		[ dispatch, match ]
	);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<React.Fragment>
			<Link className='btn btn-dark my-3 ' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'> {error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h4>{product.name}</h4>
							</ListGroupItem>
							<ListGroupItem>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} />
							</ListGroupItem>
							<ListGroupItem>Price: ${product.price}</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>

					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>
								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} <br />
											<strong>{product.countInStock}</strong>
										</Col>
									</Row>
								</ListGroupItem>
								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Qty </Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[ ...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
														
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								<ListGroupItem>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</React.Fragment>
	);
};

export default ProductScreen;
