import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiHandler from "../../api/apiHandler";

export const fetchOrderDetailById = createAsyncThunk('/order/get', async (id) => {
    const res = await apiHandler.get(`/order/${id}`);
    const data = res.data;
    return data;
})

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        orderDetail: {},
        status: 'idle'
    },
    extraReducers: {
        [fetchOrderDetailById.pending]: (state) => {
            state.status = 'loading';
            console.log('loading');
        },
        [fetchOrderDetailById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.orderDetail =  action.payload;
            console.log('success');
        },
        [fetchOrderDetailById.rejected]: (state) => {
            state.status = 'failed';
            console.log('that baij');
        }
    }
});

export default orderDetailSlice.reducer;
