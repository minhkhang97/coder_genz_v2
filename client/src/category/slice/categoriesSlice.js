import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../api/categoryApi";

export const fetchAllCategories = createAsyncThunk(
  "/category/read",
  async () => {
    let categories = await getAllCategories();
    categories = categories.map(el => ({...el, isActive: true}));
    return categories;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
  },
  reducers: {
    //cap nhat trang thai cho nhung category da ton tai trong sp roi
    setActiveInit: (state, action) => {
      //action.payload.categories = [{_id, name}, ....];
      const categoriesId = action.payload.categories.map((el) => el._id);
      console.log(categoriesId);
      categoriesId.map((id) => {
        const index = state.categories
          .map((el) => el._id)
          .indexOf(id);
          console.log(index);
        return state.categories[index].isActive = !state.categories[index].isActive;
      });
    },
    setActive: (state, action) => {
      const index = state.categories
        .map((el) => el._id)
        .indexOf(action.payload.id);
      //console.log(index, state.categories[index]);
      state.categories[index].isActive = !state.categories[index].isActive;
    },
  },

  extraReducers: {
    [fetchAllCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllCategories.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.categories = action.payload;
      state.status = "success";
    },

    [fetchAllCategories.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { setActive, setActiveInit } = categoriesSlice.actions;

export default categoriesSlice.reducer;
