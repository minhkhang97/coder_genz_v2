import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../api/categoryApi";

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

export const fetchAllCategories = createAsyncThunk(
  "/category/read",
  async () => {
    let categories = await getAllCategories();
    categories = categories.map((el) => ({ ...el, isActive: true }));
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
      let categories = state.categories.map((el) => ({
        ...el,
        isActive: true,
      }));
      //console.log(categories);
      const categoriesId = action.payload.categories.map((el) => el._id);
      categoriesId.map((id) => {
        const index = categories.map((el) => el._id).indexOf(id);
        return (categories[index].isActive = false);
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

    searchByName: (state, action) => {
      let { name } = action.payload;
      name = removeVietnameseTones(name).toLowerCase();
      let categories = state.categories;

      //neu khac rong
      if(name){
        const temp = categories.map((category) => ({
          ...category,
          products: category.products.map((el) =>
            removeVietnameseTones(el.name.toLowerCase()).indexOf(name) !== -1
              ? { ...el, isShow: true }
              : { ...el, isShow: false }
          ),
        }));
        state.categories = temp;
      }
      else{
        const temp = categories.map((category) => ({
          ...category,
          products: category.products.map((el) => ({...el, isShow: true})),
        }));
        state.categories = temp;
      }
    },
  },

  extraReducers: {
    [fetchAllCategories.pending]: (state, action) => {
      const categories = state.categories.map((el) => ({
        ...el,
        isActive: true,
      }));
      state.categories = categories;
      state.status = "loading";
    },
    [fetchAllCategories.fulfilled]: (state, action) => {
      const temp2 = action.payload.map((category) => ({
        ...category,
        products: category.products.map((el) => ({ ...el, isShow: true })),
      }));
      state.categories = temp2;
      state.status = "success";
    },

    [fetchAllCategories.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { setActive, setActiveInit, setCategories, searchByName } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
