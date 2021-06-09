import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiHandler from "../../api/apiHandler";

export const fetchCustomer = createAsyncThunk('/customer/read', async () => {
    const res = await apiHandler.get('/customer/read');
    const data = res.data;
    return data;
});

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: {},
        status: 'idle',
    },

    reducers: {

    },
    extraReducers: {
        [fetchCustomer.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchCustomer.fulfilled]: (state, action) => {
            state.customer = action.payload;
            state.status = 'success';
        },
        [fetchCustomer.rejected]: (state) => {
            state.status = 'failed';
        }
    }
});


export default customerSlice.reducers;
