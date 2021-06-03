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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    //cap nhat trang thai cho nhung category da ton tai trong sp roi
    setActiveInit: (state, action) => {
      
      //action.payload.categories = [{_id, name}, ....];
      let categories = state.categories.map(el => ({...el, isActive: true}));
      //console.log(categories);
      const categoriesId = action.payload.categories.map((el) => el._id);
      categoriesId.map((id) => {
        const index = categories
          .map((el) => el._id)
          .indexOf(id);
        return categories[index].isActive = false;
      });

      state.categories = categories;
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
      const categories = state.categories.map(el => ({...el, isActive: true}));
      state.categories = categories;
      state.status = "loading";
    },
    [fetchAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.status = "success";
    },

    [fetchAllCategories.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { setActive, setActiveInit, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
