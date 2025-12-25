import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    expiresIn: null,
    isAuthenticated: false,
    roles: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.expiresIn = action.payload.expiresIn;
            state.isAuthenticated = true;
            state.roles = action.payload.roles || [];
        },
        clearToken: (state) => {
            state.token = null;
            state.expiresIn = null;
            state.isAuthenticated = false;
            state.roles = [];
        },
        logout: (state) => {
            state.token = null;
            state.expiresIn = null;
            state.isAuthenticated = false;
            state.roles = [];
        },
    },
});

export const { setToken, clearToken, logout } = authSlice.actions;
export default authSlice.reducer;