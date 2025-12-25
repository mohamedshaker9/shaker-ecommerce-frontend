import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentMethod: null,
};

const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        clearPaymentMethod: (state) => {
            state.paymentMethod = null;
        },
    },
});

export const { setPaymentMethod, clearPaymentMethod } = paymentMethodSlice.actions;
export default paymentMethodSlice.reducer;