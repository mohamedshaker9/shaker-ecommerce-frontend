import { Description } from "@headlessui/react";
import api from "./api.js"
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "./store/slices/products-slice.jsx";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from "./store/slices/categories-slice.jsx";
import { useDispatch } from "react-redux";
import categoriesSlice from "./store/slices/categories-slice.jsx";

export const fetchProducts = (queryString) => async (dispatch) => {
    
    try {   
        dispatch(fetchProductsStart());
        console.log("Fetching products with query:", queryString);
        const response = await api.get(`/public/products?pageSize=5&${queryString || ""}`);
        console.log("Products fetched:", response.data.products);
        dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
        console.error("Failed to fetch products:", error);
        dispatch(fetchProductsFailure({error: error.message}) );
    }   
}

export const fetchCategories = () => async (dispatch) => {
    
    try {   
        dispatch(fetchCategoriesStart());
        const response = await api.get(`/public/categories`);
        dispatch(fetchCategoriesSuccess({categories: response.data.categories}) );
    } catch (error) {
        console.error("Failed to fetch products:", error);
        dispatch(fetchCategoriesFailure({error: error.message}) );
    }   
}




