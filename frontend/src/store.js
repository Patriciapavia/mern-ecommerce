import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer } from './reducers/orderReducers'
import { userLoginReducer, userUpdateProfileReducer, userRegisterReducer, userDetailReducer } from './reducers/userReducers'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer
	                                 
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// const oldproduct = window.localStorage.getItem('cartItems') ? window.localStorage.getItem('cartitems') : "[]";
//         const arrayproduct =  JSON.parse(oldproduct);  
    
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null
 
    

const initialState = {
	cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingFromStorage},
	userLogin: { userinfo: userInfoFromStorage }

};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
