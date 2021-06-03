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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.products[0].name = action.payload.name;
    },
    setPrice: (state, action) => {
      state.products[0].price = action.payload.price;
    },
    setActiveForProduct: (state, action) => {
      const index = state.products
        .map((el) => el._id)
        .indexOf(action.payload.id);
      //console.log(index, state.categories[index]);
      state.products[index].isActive = !state.products[index].isActive;
    },
    setActiveInitForProduct: (state, action) => {
      //cap nhat cho tat ca ve lai true
      let products = state.products.map(el => ({...el, isActive: true}));
      const productsId = action.payload.products.map((el) => el._id);
      productsId.map((id) => {
        const index = state.products
          .map((el) => el._id)
          .indexOf(id);
        return products[index].isActive = false;
      });
      state.products = products;
    }
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "success";
      const products = [
        ...action.payload.map((el) => ({ ...el, isActive: true })),
      ];
      state.products = products;
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

export const {setName, setPrice, setActiveForProduct, setActiveInitForProduct} = productsSlice.actions;

export default productsSlice.reducer;
