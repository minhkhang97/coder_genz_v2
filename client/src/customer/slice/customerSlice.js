import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiHandler from "../../api/apiHandler";

export const fetchCustomer = createAsyncThunk('/customer/read', async () => {
    const res = await apiHandler.get('/customer/read');
    const data = res.data;
    console.log(data);
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
            console.log('loading');
            state.status = 'loading'
        },
        [fetchCustomer.fulfilled]: (state, action) => {
            state.customer = action.payload;
            console.log('thanh cong');
            state.status = 'success';
        },
        [fetchCustomer.rejected]: (state) => {
            console.log('that bai');
            state.status = 'failed';
        }
    }
});


export default customerSlice.reducer;
