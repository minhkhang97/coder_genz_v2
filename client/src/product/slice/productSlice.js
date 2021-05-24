import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import shortid from "shortid";
import { createProduct } from "../../api/productApi";

export const postProduct = createAsyncThunk(
  "/products/post",
  async (product) => {
    let temp = {...product};
    temp.categories = product.categories.map(el => el._id);
    console.log(temp);
    const result = await createProduct(temp);
    return result;
  }
);

export const fetchProductById = createAsyncThunk(
  "/products/read",
  async (params, thunk) => {
    const { id } = params;
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    const data = await res.data;
    return data;
  }
);

const initProduct = {
  id: shortid.generate(),
  name: "",
  price: 0,
  discount: 0,
  isPublic: true,
  status: { code: "001", mess: "" },
  introduce: "",
  description: "",
  properties: [],
  photos: [],
  quantity: 0,
  create_at: Date.now(),
  categories: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: "idle",
    product: initProduct,
  },
  reducers: {
    setInitialState: (state) => {
      state.product = initProduct;
    },
    setName: (state, action) => {
      state.product.name = action.payload.name;
    },
    setPrice: (state, action) => {
      state.product.price = action.payload.price;
    },
    setDiscount: (state, action) => {
      state.product.discount = action.payload.discount;
    },
    setIntroduce: (state, action) => {
      state.product.introduce = action.payload.introduce;
    },
    setDescription: (state, action) => {
      state.product.description = action.payload.description;
    },
    setPublic: (state, action) => {
      state.product.isPublic = !state.product.isPublic;
    },

    setQuantity: (state, action) => {
      state.product.quantity = action.payload.quantity;
    },

    setStatus: (state, action) => {
      state.product.status.code = action.payload.status.code;
      if(action.payload.status.code === '001')
        state.product.status.mess = 'còn hàng';
      else if(action.payload.status.code === '002')
        state.product.status.mess = 'hết hàng';
      else 
        state.product.status.mess = 'ngưng bán';
    },

    addProperty: (state) => {
      state.product.properties.push({
        id: shortid.generate(),
        name: "",
        isRequire: true,
        quantityMax: 1,
        quantityMin: 1,
        options: [
          {
            id: shortid.generate(),
            value: "",
          },
        ],
      });
    },
    setPhotos: (state, action) => {
      state.product.photos = action.payload.photos;
    },

    addCategory: (state, action) => {
      state.product.categories.push(action.payload.category);
    },
    removeCategory: (state, action) => {
      const index = state.product.categories.map(el => el._id).indexOf(action.payload.id);
      state.product.categories.splice(index, 1);
    },

    //xoa property theo id
    removeProperty: (state, action) => {
      const { propertyId } = action.payload;
      const { properties } = state.product;
      const index = properties
        .map((property) => property.id)
        .indexOf(propertyId);
      properties.splice(index, 1);
    },

    //them gia tri cho option nao
    addOption: (state, action) => {
      const { propertyId } = action.payload;
      const { properties } = state.product;
      const index = properties
        .map((property) => property.id)
        .indexOf(propertyId);
      properties[index].options.push({
        id: shortid.generate(),
        value: "",
      });
    },
    removeOption: (state, action) => {
      const { propertyId, optionId } = action.payload;
      const indexProperty = state.product.properties
        .map((property) => property.id)
        .indexOf(propertyId);
      const indexOption = state.product.properties[indexProperty].options
        .map((option) => option.id)
        .indexOf(optionId);
      state.product.properties[indexProperty].options.splice(indexOption, 1);
      if (state.product.properties[indexProperty].options.length === 0)
        state.product.properties.splice(indexProperty, 1);
    },
    //biet pr
    setValueForOption: (state, action) => {
      const { propertyId, optionId, value } = action.payload;
      const indexProperty = state.product.properties
        .map((property) => property.id)
        .indexOf(propertyId);
      const indexOption = state.product.properties[indexProperty].options
        .map((option) => option.id)
        .indexOf(optionId);
      state.product.properties[indexProperty].options[indexOption].value =
        value;
    },
    //action: propertyId, name
    setNameForProperty: (state, action) => {
      //
      const { propertyId, name } = action.payload;
      const indexProperty = state.product.properties
        .map((property) => property.id)
        .indexOf(propertyId);
      state.product.properties[indexProperty].name = name;
    },
    setRequireForProperty: (state, action) => {
      const { propertyId } = action.payload;
      const indexProperty = state.product.properties
        .map((property) => property.id)
        .indexOf(propertyId);
      state.product.properties[indexProperty].isRequire =
        !state.product.properties[indexProperty].isRequire;
    },
    setQuantityMaxForPropety: (state, action) => {
      const { propertyId, quantityMax } = action.payload;
      //console.log(amountMax);
      const indexProperty = state.product.properties
        .map((property) => property.id)
        .indexOf(propertyId);
      state.product.properties[indexProperty].quantityMax = quantityMax;
    },
    setQuantityMinForPropety: (state, action) => {
      const { propertyId, quantityMin } = action.payload;
      //console.log(amountMin);
      const indexProperty = state.product.properties
        .map((property) => property.id)
        .indexOf(propertyId);
      state.product.properties[indexProperty].quantityMin = quantityMin;
    },
  },

  extraReducers: {
    [postProduct.fulfilled]: (state, action) => {
      console.log("them san pham thanh cong");
    },
    [fetchProductById.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProductById.fulfilled]: (state, action) => {
      state.status = "success";
      state.product = action.payload;
    },
    [fetchProductById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const {
  setInitialState,
  setName,
  setPrice,
  setDiscount,
  setIntroduce,
  setQuantity,
  setDescription,
  addCategory,
  removeCategory,
  setStatus,
  setPublic,
  setQuantityMaxForPropety,
  setQuantityMinForPropety,
  setRequireForProperty,
  setPhotos,
  addProperty,
  removeProperty,
  addOption,
  removeOption,
  setValueForOption,
  setNameForProperty,
} = productSlice.actions;

export default productSlice.reducer;
