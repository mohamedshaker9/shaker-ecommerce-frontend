import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedAddress: {
        id: '',
        Addresstype: '', 
        street: '',
        buildingNumber: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    },
};

const addressSlice = createSlice({
    name: 'selectedAddress',
    initialState,
    reducers: {
        setSelectedAddress: (state, action) => {
            state.selectedAddress.id = action.payload.address.id;
            state.selectedAddress.Addresstype = action.payload.address.Addresstype;
            state.selectedAddress.street = action.payload.address.street;
            state.selectedAddress.buildingNumber = action.payload.address.buildingNumber;
            state.selectedAddress.city = action.payload.address.city;
            state.selectedAddress.state = action.payload.address.state;
            state.selectedAddress.country = action.payload.address.country;
            state.selectedAddress.zipCode = action.payload.address.zipCode;
         
        },
        clearSelectedAddress: (state) => {
            state.selectedAddress = initialState.selectedAddress;
        },
    },
});

export const { setSelectedAddress, clearSelectedAddress } = addressSlice.actions;
export default addressSlice.reducer;