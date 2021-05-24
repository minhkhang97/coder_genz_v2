const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = new Schema({
  id: { type: String },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true
  },
  discount: {
    type: Number,
  },
  introduce: {
    type: String,
  },
  description: {
    type: String,
  },
  photos: [
    {
      _id: Schema.Types.ObjectId,
      //dung cho client
      id: String,
      alt: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  status: {
    code: {
      type: String,
      default: '001',
    },
    mess: {
      type: String,
      default: 'còn hàng',
    },
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  quantity: {
    type: Number,
  },
  properties: [
    {
      _id: Schema.Types.ObjectId,
      id: String,
      name: {
        type: String,
      },
      quantityMin: {
        type: Number,
      },
      isRequire: {
        type: Boolean,
      },
      options: [
        {
          value: {
            _id: Schema.Types.ObjectId,
            id: String,
            type: String,
          },
        },
      ],
      quantityMax: {
        type: Number,
      },
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  ],
  create_at: {
    type: Date,
    default: Date.now,
    // time: {
    //     type: Date,
    //     default: Date.now,
    // },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    // }
  },
  user: {
    type: Schema.Types.ObjectId,
    //required: true,
    ref: "user",
  },
});

const Product = mongoose.model("product", product);

module.exports = Product;
