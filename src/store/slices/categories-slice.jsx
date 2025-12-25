import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  categories: [],
  isCategoriesLoading: false,
  isCatogoriesError: null
};


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.isCategoriesLoading = true;
      state.isCatogoriesError = null;
    },
    fetchCategoriesSuccess(state, action) {
      state.isCategoriesLoading = false;
      if(action.payload.categories !== undefined){
        state.categories = action.payload.categories;
        console.log("Categories fetched:", state.categories);
      }
      state.isCatogoriesError = null;
    },
    fetchCategoriesFailure(state, action) {
      state.isCategoriesLoading = false;
      state.isCatogoriesError = action.payload.error || 'ERROR FETCHING CATEGORIES';
    },
  },
});


export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;
export default categoriesSlice.reducer;