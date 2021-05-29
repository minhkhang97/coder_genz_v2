import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../../api/orderApi";

export const postOrder = createAsyncThunk('/order/create', async (order) => {
  console.log(order);
  const orderResutl = await createOrder(order);
  console.log(order);
  return orderResutl;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: "idle",
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeOrder: (state, action) => {
      const index = state.cart.map((el) => el.id).indexOf(action.payload);
      state.cart.splice(index, 1);
    },
    //tang cho san pham nao
    plusAmountOrder: (state, action) => {
      const index = state.cart.map((el) => el.id).indexOf(action.payload);
      state.cart[index].amount += 1;
    },
    minusAmountOrder: (state, action) => {
      const index = state.cart.map((el) => el.id).indexOf(action.payload);
      if (state.cart[index].amount > 1) state.cart[index].amount -= 1;
    },
  },
  extraReducers: {
    [postOrder.fulfilled]: () => {
      console.log('dat hang thanh cong');
    }
  }
});

export const { addCart, plusAmountOrder, removeOrder, minusAmountOrder } = cartSlice.actions;

export default cartSlice.reducer;
