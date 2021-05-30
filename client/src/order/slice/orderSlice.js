import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrder } from "../../api/orderApi";

export const fetchAllOrder = createAsyncThunk('/orders/get', async () => {
    const orders = await getAllOrder();
    return orders;
})

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        status: 'idle',
        orders: [],
    },
    extraReducers: {
        [fetchAllOrder.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchAllOrder.fulfilled]: (state, action) => {
            state.status = 'success';
            state.orders = action.payload;
        },
        [fetchAllOrder.rejected]: (state) => {
            state.status = 'failed';
        }
    }
});

export default ordersSlice.reducer;