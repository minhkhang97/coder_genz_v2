import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../guards/userSlice';
import productReducer from '../product/slice/productSlice';
import productsReducer from '../product/slice/productsSlice';
import categoriesReducer from '../category/slice/categoriesSlice';
import categoryReducer from '../category/slice/categorySlice';

const store = configureStore({
    reducer: {
        userReducer,
        productReducer,
        categoriesReducer,
        productsReducer,
        categoryReducer,
    }
});

export default store;