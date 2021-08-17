import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
const [name, setName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [message, setMessage] = useState(null)

 const redirect = location.search ? location.search.split('=')[1] : '/'

 const dispatch = useDispatch()

 const userRegister = useSelector(state => state.userRegister)
 const { loading, error, userInfo } = userRegister

 useEffect(() => {
     if (userInfo) {
         history.push(redirect)
     }
 }, [history, userInfo, redirect])

 const submitHandler = (e) => {
     e.preventDefault()
     if(password !== confirmPassword){
         setMessage('Password Do not match')
     } else {
        dispatch(register(name, email, password))
     }
 }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
               <Form.Group  controlId='name'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group  controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group  controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group  controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' placeholder='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
             </Form>
            <Row className='py3'>
                <Col>Have an account ? <Link to={redirect? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
