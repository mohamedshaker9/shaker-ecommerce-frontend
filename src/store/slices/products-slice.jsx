import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  products: [],
  isLoading: false,
  error: null,
  pagination:{},
};


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.isLoading = false;
      if(action.payload.products !== undefined){
        state.products = action.payload.products;
      }
      state.error = null;
      state.pagination = {
        pageSize: action.payload.pageSize,
        pageNumber: action.payload.pageNumber,
        totalItems: action.payload.total,
        totalPages: action.payload.totalPages,
        isLastPage: action.payload.lastPage || true,
      };
    },
    fetchProductsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload.error || 'Something went wrong';
    },
  },
});


export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions;
export default productsSlice.reducer;