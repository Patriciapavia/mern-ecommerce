import React, {useEffect} from 'react'
import {Row, Col }from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {
	const dispatch = useDispatch()

	const productList = useSelector(state => state.productList)

	const { loading, products, error } = productList

	useEffect(() => {
	dispatch(listProducts())
	}, [dispatch])


	return (
		<React.Fragment>
		 <h1>Latest Products</h1>
		{
			loading ? (<Loader/>) : error? (<Message varient='danger'>{error}</Message>) : 
			(<Row>
				{products.map((product) =>(
					<Col sm={12} md={6} xl={3}>
					 <Product product = {product}/>
					</Col>
				))}
		   </Row>	)
		}
		 
		</React.Fragment>
	)
}

export default HomeScreen
