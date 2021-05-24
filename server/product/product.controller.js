const Product = require("./product.model");
const Category = require("../category/category.model");

//product: cart, order_detail, category

//find all
//phan trang
const findAllProduct = async () => {
  const products = await Product.find()
    .populate({ path: "categories", select: "_id name" })
    .populate({ path: "user", select: "_id email" });
  //.populate({ path: "create_at", populate: { path: "user" } });
  return products;
};

//tim kiem voi phan trang
const findProductByPage = async (page, limit = 10) => {
  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return products;
};

//filter: theo ten, theo gia ban

const findProductByCategory = async (idCategory) => {
  const products = await Product.find({ category: idCategory });
  return products;
};

//find one by id
const findOneProduct = async (id) => {
  const product = await Product.findById(id)
    .populate({
      path: "categories",
      select: "_id name",
    })
    .populate({ path: "user", select: "_id email" });
  return product;
};

//create

//lien quan den category
const createProduct = async (product, user) => {
  //console.log(product);
  //product.status = {code: value, msg: null}
  // if(product.status.code === '001') product.status.mess = 'còn hàng';
  // if(product.status.code === '002') product.status.mess = 'hết hàng';
  // if(product.status.code === '003') product.status.mess = 'ngừng bán';

  const productNew = new Product({ ...product, user });

  //luu san pham moi
  const productResult = await productNew.save();

  console.log(productResult);
  //productResult.categories: []

  //luu id product vao collection category
  await Category.updateMany(
    { _id: { $in: productResult.categories } },
    { $push: {products: productResult._id} }
  );

  return productResult;
};

//update
const updateProduct = async (id, product) => {
  const productBeforeUpdate = await Product.findOne({ _id: id });

  //update product
  //console.log(product);
  const productAfterUpdate = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...product,
      create_at: Date.now(),
    },
    { new: true }
  );
  console.log(productAfterUpdate);

  //update category: thay doi category
  //xoa san pham trong category cu
  await Category.updateMany(
    { _id: productBeforeUpdate.categories },
    { $pull: { products: productAfterUpdate._id } }
  );
  //them san pham vao category moi
  await Category.updateMany(
    { _id: productAfterUpdate.categories },
    { $push: { products: productAfterUpdate._id } }
  );

  //update order_detail

  return productAfterUpdate;
};

//delete

//ko nen xoa san pham

module.exports = {
  findOneProduct,
  findAllProduct,
  findProductByPage,
  createProduct,
  updateProduct,
};
