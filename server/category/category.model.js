const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = new Schema({
  id: String,
  name: {
    type: String,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      //required: true,
      ref: "product",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    //required: true,
    ref: "user",
  },
  create_at: {
    type: Date,
  },
});

const Category = mongoose.model("category", category);

module.exports = Category;
