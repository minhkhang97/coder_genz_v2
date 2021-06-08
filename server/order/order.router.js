const express = require("express");
const OrderDetail = require("../order detail/orderdetail.model");
const Order = require("./order.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");

const router = express.Router();

const { validOrder } = require("../ultis/validation");
const Customer = require("../customer/customer.model");
const Product = require("../product/product.model");

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      mess: error.msg,
    };
  },
});

router.post("/v2", validOrder, async (req, res) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    const t = errors.array();
    console.log(t);
    return res.status(200).json({ error: errors.array().map((el) => el.mess) });
  }
  const order = req.body;

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  res.send("linh tinh");
});

//test dat hang
router.post("/test", validOrder, async (req, res) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    const t = errors.array();
    return res.status(200).json({ error: errors.array().map((el) => el.mess) });
  }

  const order = req.body;
  let orderDetails = order.cart;
  orderDetails = orderDetails.map((el) => ({
    id: el.id,
    productId: el.productId,
    name: el.name,
    price: el.price,
    quantity: el.amount,
    totalPrice: el.price * el.amount,
    properties: el.properties.map((property) => ({
      name: property.name,
      options: property.options,
    })),
    product: el.productId,
  }));

  const totalQuantity = orderDetails
    .map((el) => el.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  const totalPrice = orderDetails
    .map((el) => el.totalPrice)
    .reduce((acc, curr) => acc + curr, 0);

  //them order trc

  const orderNew = new Order({
    contact: order.contact,
    order_details: orderDetails,
    totalPrice,
    totalQuantity,
    status: [{ code: "001", mess: "chờ xác nhận" }],
  });

  console.log(orderNew);

  const orderResult = await orderNew.save();

  const orderId = orderResult._id;

  //console.log(orderId);

  //sau day thi them vao customer

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_1);
      const isCustomer = await Customer.findOne({ _id: decode.sub });
      //console.log(isCustomer);
      if (isCustomer) {
        //them order o day
        const temp = await Customer.findOneAndUpdate(
          { _id: decode.sub },
          { $push: { orders: orderId } },
          { new: true }
        );
      }
    } catch {
      console.log("loi");
    }
  }

  return res.status(200).json({ success: true, data: orderResult });
});

//cap nhat trang thai don hang

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const isOrder = Order.findOne({ _id: id });
    if (!isOrder)
      return res
        .status(200)
        .json({ success: false, error: ["đơn hàng không tồn tại"] });
    //th don gian nhat

    const orderUpdateStatus = await Order.findOneAndUpdate(
      { _id: id },
      { $push: { status: status } },
      { new: true }
    );

    return res.status(200).json({ success: true, data: orderUpdateStatus });
  }
);

router.get("/thongkedoanhso", async (req, res) => {
  //

  //start: thoi gian bat dau
  //end: thoi gian ket thuc
  //type: tieu chi thong ke(theo ngay, theo thang, theo nam)
  const { start, end, type } = req.body;

  //thong ke theo ngay
  const day = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$create_at" } },
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  const month = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$create_at" } },
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  const year = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y", date: "$create_at" } },
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  console.log(day, month, year);
  return res.status(200).json({success: true, data: day});
});

//thong ke theo so luong san pham
//phan nay co ve kho ne

//dung roi ne, perfe
router.get("/thongkesanpham", async (req, res) => {
  const temp = await Order.aggregate([
    {
      $project: {
        order_details: 1,
        _id: false,
        create_at: 1,
      },
    },
    {
      $unwind: "$order_details",
    },
    {
      $addFields: {
        "order_details.create_at": "$create_at",
      },
    },

    {
      $replaceRoot: {
        newRoot: "$order_details",
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$create_at" } },
          product: "$product",
        },
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id.product",
        foreignField: "_id",
        as: "product_docs",
      },
    },
  ]);

  const temp2 = await Order.aggregate([
    {
      $unwind: "$order_details",
    },
    {
      $addFields: {
        "order_details.create_at": "$create_at",
      },
    },

    {
      $replaceRoot: {
        newRoot: "$order_details",
      },
    },
    {
      $lookup: {
        from: "product",
        localField: "product",
        foreignField: "_id",
        as: "product_doc",
      },
    },
  ]);

  // const t2 = temp.map(el => el.order_details).flat();
  // console.log(t2);
  res.json(temp);
});

//su dung voi cai order detail
router.get("/thongke2", async (req, res) => {
  const temp = await OrderDetail.aggregate([{
    $lookup: {
      from: 'products',
      localField: 'product',
      foreignField: '_id',
      as: 'product_doc'
    }
  }])

  return res.json(temp);
});

module.exports = router;
