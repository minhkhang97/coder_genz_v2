import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, login } from "../api/authApi";


export const fetchUser = createAsyncThunk('/auth/admin/user', async (parms, thunk) => {
    //param: email, password
    const user = await getUser();
    console.log(user);
    return user;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        status: 'idle'
    },
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'success';
            state.user = action.payload;
        },
        [fetchUser.rejected]: (state) => {
            state.status = 'failed'
        }
    },
});

export default userSlice.reducer;

