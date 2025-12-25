import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';



const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    specialPrice: newItem.specialPrice,   
                    quantity: 1,
                    discount: 0,
                });
                
            }
            
            state.totalQuantity += 1;
            state.totalPrice += newItem.price;
            state.specialPrice += newItem.specialPrice;
        },
        
        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.specialPrice -= item.specialPrice * item.quantity;
                state.items = state.items.filter((item) => item.id !== id);
            }
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item && quantity > 0) {
                const difference = quantity - item.quantity;
                state.totalQuantity += difference;
                state.totalPrice += item.price * difference;
                state.specialPrice += item.specialPrice * difference;
                item.quantity = quantity;
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
            state.specialPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;