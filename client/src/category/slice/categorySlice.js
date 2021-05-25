import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";
import { createCategory, getOneCategory, updateCategoryById } from "../../api/categoryApi";

export const fetchOneCategory = createAsyncThunk(
  "/categories/get",
  async (id) => {
    const result = await getOneCategory(id);
    return result;
  }
);

export const postCategory = createAsyncThunk('/categories/create', async (category) => {
    const result = await createCategory(category);
    return result; 
});

export const updateCategory = createAsyncThunk('/categories/update', async (category) => {
    const result = await updateCategoryById(category);
    return result;
})

const init = {
  _id: "",
  id: shortid.generate(),
  name: "",
  products: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: init,
    status: "idle",
  },
  reducers: {
    setInitCategory: (state) => {
      state.category = init;
    },
    setNameCatgory: (state, action) => {
      state.category.name = action.payload.name;
    },
    addProductForCategory: (state, action) => {
      state.category.products.push(action.payload.product);
    },
    removeProductForCategory: (state, action) => {
      const index = state.category.products
        .map((el) => el._id)
        .indexOf(action.payload.id);
      state.category.products.splice(index, 1);
    },
  },
  extraReducers: {
    [fetchOneCategory.pending]: (state) => {
      state.status = "loading";
    },
    [fetchOneCategory.fulfilled]: (state, action) => {
      state.category = action.payload;
      state.status = "success";
    },
    [fetchOneCategory.rejected]: (state) => {
      state.status = "failed";
    },
    [postCategory.pending]: (state, action) => {
        state.status = 'loading'
    },
    [postCategory.fulfilled]: (state, action) => {
        state.category = action.payload;
        state.status = 'success';
        console.log('them category thanh cong')
    },
    [updateCategory.fulfilled]: (state) => {
        console.log('cap nhat thanh cong');
    }
  },
});

export const {
  setInitCategory,
  setNameCatgory,
  addProductForCategory,
  removeProductForCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
