//lay danh sach san pham
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getOneProduct } from "../../api/productApi";
import shortid from 'shortid';

//lay danh sach cac san pham
export const fetchProducts = createAsyncThunk(
  "/products/getAll",
  async (parms, thunk) => {
    const products = await getAllProducts();
    //cai nay la payload ma extraReducer nhan
    return products;
  }
);

export const fetchProductById = createAsyncThunk(
  "/products/read",
  async (params, thunk) => {
    const { id } = params;
    const product = await getOneProduct(id);
    return product;
  }
);

const initialState = {
  products: [],
  status: "idle",
};

const initProduct = {
  id: shortid.generate(),
  name: "",
  price: 0,
  discount: 0,
  isPublic: true,
  status: { code: "001", msg: "" },
  introduce: "",
  description: "",
  properties: [],
  photos: [],
  quantity: 0,
  create_at: Date.now(),
  categories: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {
      state.products = [];
      state.products.push(initProduct);
    },
    setName: (state, action) => {
      state.products[0].name = action.payload.name;
    },
    setPrice: (state, action) => {
      state.products[0].price = action.payload.price;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "failed";
    },
    [fetchProductById.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProductById.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = [action.payload];
    },
    [fetchProductById.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const {addProduct, setName, setPrice} = productsSlice.actions;

export default productsSlice.reducer;
