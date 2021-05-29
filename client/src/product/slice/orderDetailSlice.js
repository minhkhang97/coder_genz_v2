import { createSlice } from "@reduxjs/toolkit";
const orderDetailSlice = createSlice({
  name: "orderdetail",
  initialState: {
    status: "idle",
    orderDetail: {},
  },
  reducers: {
    setInitOrderDetail: (state, action) => {
      state.orderDetail = action.payload;
    },
    //propertyId, option: [{value, amount}]
    setValueOfProperty: (state, action) => {
      const { propertyId, value, optionId } = action.payload;

      //trong so luong cho phep
      const totalQuantity = state.orderDetail.properties
        .filter((el) => el.id === propertyId)[0]
        .options.map((el) => el.amount)
        .reduce((acc, curr) => acc + curr, 0);
      //kiem tra xem optionid da ton tai chua
      const index = state.orderDetail.properties
        .map((el) => el.id)
        .indexOf(propertyId);
      const index2 = state.orderDetail.properties[index].options
        .map((el) => el._id)
        .indexOf(optionId);

      if (index2 >= 0) {
        state.orderDetail.properties[index].options.splice(index2, 1);
      }
      if (
        totalQuantity <
        state.orderDetail.properties.filter((el) => el.id === propertyId)[0]
          .quantityMax
      ) {
        if (index2 < 0) {
          //chua ton tai
          state.orderDetail.properties[index].options.push({
            value,
            amount: 1,
            _id: optionId,
          });
        } else {
          state.orderDetail.properties[index].options.splice(index2, 1);
        }
      }

      //neu chua thi them moi
      //neu co roi thi bo cai cu di
    },
    //can: propertyId, optionId
    plusAmountValueOfProperty: (state, action) => {
      const { propertyId, optionId } = action.payload;
      const index = state.orderDetail.properties
        .map((el) => el.id)
        .indexOf(propertyId);
      const index2 = state.orderDetail.properties[index].options
        .map((el) => el._id)
        .indexOf(optionId);
      const totalQuantity = state.orderDetail.properties
        .filter((el) => el.id === propertyId)[0]
        .options.map((el) => el.amount)
        .reduce((acc, curr) => acc + curr, 0);

      if (
        totalQuantity <
        state.orderDetail.properties.filter((el) => el.id === propertyId)[0]
          .quantityMax
      )
        state.orderDetail.properties[index].options[index2].amount += 1;
    },
    //can: propertyId, optionId
    minusAmountValueOfProperty: (state, action) => {
      const { propertyId, optionId } = action.payload;
      const index = state.orderDetail.properties
        .map((el) => el.id)
        .indexOf(propertyId);
      const index2 = state.orderDetail.properties[index].options
        .map((el) => el._id)
        .indexOf(optionId);
      if (state.orderDetail.properties[index].options[index2].amount > 1)
        state.orderDetail.properties[index].options[index2].amount -= 1;
    },
  },
});

export const {
  setInitOrderDetail,
  setValueOfProperty,
  plusAmountValueOfProperty,
  minusAmountValueOfProperty,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
