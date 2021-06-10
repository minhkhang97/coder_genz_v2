import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../guards/userSlice';
import productReducer from '../product/slice/productSlice';
import productsReducer from '../product/slice/productsSlice';
import categoriesReducer from '../category/slice/categoriesSlice';
import categoryReducer from '../category/slice/categorySlice';
import orderDetailReducer from '../product/slice/orderDetailSlice';
import cartReducer from '../product/slice/cartSlice';
import ordersReducer from '../order/slice/orderSlice';
import orderDetailsReducer from '../order/slice/orderDetailSlice';
import customerReducer from '../customer/slice/customerSlice';
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
        customerReducer,
        orderDetailsReducer
    }
});

export default store;