import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../guards/userSlice';
import productReducer from '../product/slice/productSlice';
import productsReducer from '../product/slice/productsSlice';
import categoriesReducer from '../category/slice/categoriesSlice';
import categoryReducer from '../category/slice/categorySlice';
import orderDetailReducer from '../product/slice/orderDetailSlice';
import cartReducer from '../product/slice/cartSlice';
import ordersReducer from '../order/slice/orderSlice';

const store = configureStore({
    reducer: {
        userReducer,
        productReducer,
        categoriesReducer,
        productsReducer,
        categoryReducer,
        orderDetailReducer,
        cartReducer,
        ordersReducer,
    }
});

export default store;