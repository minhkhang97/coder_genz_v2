const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  contact: {
    fullname: {
      type: String,
    },
    phone: String,
    specific_address: String,
    address: {
      city: String,
      district: String,
      village: String,
      specific_address: String,
    },
  },
  order_details: [],
  status: [
    {
      code: {
        type: String,
        default: "001",
      },
      mess: { type: String, default: "cho xac nhan" },
    },
  ],
  totalPrice: Number,
  totalQuantity: Number,
  create_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
