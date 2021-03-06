import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer
});

// const cartItemsFromStorage = window.localStorage.getItem('cartItems') ? window.localStorage.getItem('cartItems') : []

const oldproduct = window.localStorage.getItem('cartItems') ? window.localStorage.getItem('cartitems') : "[]";
        const arrayproduct =  JSON.parse(oldproduct);  
       
       
    

const initialState = {
	cart: { cartItems: arrayproduct }
};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
