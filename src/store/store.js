import { preload } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import  productsReducer from "./slices/products-slice.jsx";
import categoriesReducer from "./slices/categories-slice.jsx";
import cartReducer from "./slices/cart-slice.jsx";
import authReducer from "./slices/auth-slice.jsx";
import selectedAddressReducer from "./slices/address-slice.jsx";
import paymentMethodReducer from "./slices/payment-method-slice.jsx";

const CART_STORAGE_KEY = 'cart';
const USER_TOKEN_STORAGE_KEY = 'userToken';
const SELECTED_ADDRESS_STORAGE_KEY = 'selectedAddress';

const initialCartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  specialPrice: 0,
};


const initialUserToken = {
    token: null,
    expiresIn: null,
    isAuthenticated: false,
}


const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : undefined;
    } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        return undefined;
    }
};


const saveCartToLocalStorage = (cart) => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
    }
};




const loadUserTokenFromLocalStorage = () => {
try {
    const token = localStorage.getItem(USER_TOKEN_STORAGE_KEY);
    return token ? JSON.parse(token) : undefined;
} catch (error) {
    console.error("Failed to load user token from localStorage:", error);
    return undefined;
}
};


const saveUserTokenToLocalStorage = (userToken) => {
    try {
        localStorage.setItem(USER_TOKEN_STORAGE_KEY, JSON.stringify(userToken));
    } catch (error) {
        console.error("Failed to save userToken to localStorage:", error);
    }
};



const loadSelectedAddressFromLocalStorage = () => {
try {
    const selectedAddress = localStorage.getItem(SELECTED_ADDRESS_STORAGE_KEY);
    return selectedAddress ? JSON.parse(selectedAddress) : undefined;
} catch (error) {
    console.error("Failed to load Selected Address from localStorage:", error);
    return undefined;
}
};


const saveSelectedAddressToLocalStorage = (selectedAddress) => {
    try {
        localStorage.setItem(SELECTED_ADDRESS_STORAGE_KEY, JSON.stringify(selectedAddress));
    } catch (error) {
        console.error("Failed to save Selected Address to localStorage:", error);
    }
};



const preloadedCart  = loadCartFromLocalStorage();
const preloadedUserToken = loadUserTokenFromLocalStorage();
const preloadedSelectedAddress = loadSelectedAddressFromLocalStorage();

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        auth: authReducer,
        selectedAddress: selectedAddressReducer,
        paymentMethod: paymentMethodReducer,
    },
    preloadedState:{cart: preloadedCart  
        ? { ...initialCartState, ...preloadedCart }
        : initialCartState,
        auth: preloadedUserToken  
        ? { ...initialUserToken, ...preloadedUserToken }
        : initialUserToken,
        selectedAddress: preloadedSelectedAddress
        ? { ...preloadedSelectedAddress }
        : undefined
    },
        
});

store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
  saveUserTokenToLocalStorage(state.auth);
  saveSelectedAddressToLocalStorage(state.selectedAddress);
});