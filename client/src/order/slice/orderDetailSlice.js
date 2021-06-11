import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiHandler from "../../api/apiHandler";

export const fetchOrderDetailById = createAsyncThunk('/order/get', async (id) => {
    const res = await apiHandler.get(`/order/${id}`);
    const data = res.data;
    console.log(data);
    return data;
})

const orderDetailSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orderDetails: {},
        status: 'idle'
    },
    reducers: {
        setInitOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        }
    },
    extraReducers: {
        [fetchOrderDetailById.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchOrderDetailById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.orderDetails =  action.payload;
        },
        [fetchOrderDetailById.rejected]: (state) => {
            state.status = 'failed';
        }
    }
});

export const {setInitOrderDetails} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
