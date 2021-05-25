//categoty: product, user

const Category = require("./category.model");
const Product = require("../product/product.model");

//find all
const findAllCategory = async () => {
  const categories = await Category.find().populate({ path: "products" });
  return categories;
};

const findOneCategory = async (idCategory) => {
  const categories = await Category.findOne({ _id: idCategory }).populate({
    path: "products",
  });
  return categories;
};

//create
const createCategory = async (category, user) => {
  //category: name, products, user
  const { name, products } = category;

  //kiem tra xem cac id san pham trong product co ton tai khong
  
  const categoryNew = new Category({
    name,
    products,
    user,
    create_at: Date.now(),
  });

  const categoryResult = await categoryNew.save();

  await Product.updateMany(
    { _id: { $in: categoryResult.products } },
    { $push: { categories: categoryNew._id } }
  );

  return categoryResult;
};

//update
const updateCategory = async (idCategory, category) => {
  const categoryBeforeUpdate = await Category.findOne({ _id: idCategory });
  console.log(categoryBeforeUpdate);
  //update product
  //findOneAndUpdate thi se tra ve san pham sau update
  const categoryAfterUpdate = await Category.findOneAndUpdate(
    { _id: idCategory },
    { ...category },
    { new: true }
  );

  //update category: thay doi category
  //console.log(categoryAfterUpdate);
  //console.log(test);
  //xoa san pham trong category cu
  //updateMany tra ve query
  await Product.updateMany(
    { _id: categoryBeforeUpdate.products },
    { $pull: { categories: categoryAfterUpdate._id } }
  );
  //them san pham vao category moi
  await Product.updateMany(
    { _id: categoryAfterUpdate.products },
    { $push: { categories: categoryAfterUpdate._id } }
  );

  return categoryAfterUpdate;
};

module.exports = {
  createCategory,
  updateCategory,
  findAllCategory,
  findOneCategory,
};