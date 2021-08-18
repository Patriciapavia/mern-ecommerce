
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CartCheckoutStep  from '../components/CartCheckoutStep'
const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

   const submitHandler = (e) => {
       e.preventDefault()
       dispatch(saveShippingAddress({ address, city, postalCode, country }))
       history.push('/payment')
   }

    return (
        <FormContainer>
            <CartCheckoutStep step1 step2/>
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
            <Form.Group  controlId='address'>
                <Form.Label>Enter Address</Form.Label>
                <Form.Control type='address' placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group  controlId='city'>
                  <Form.Label>Enter city</Form.Label>
                  <Form.Control type='city' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group  controlId='postalCode'>
                  <Form.Label>Enter postcode</Form.Label>
                  <Form.Control type='postalCode' placeholder='postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group  controlId='country'>
                  <Form.Label>Enter country</Form.Label>
                  <Form.Control type='country' placeholder='country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen
