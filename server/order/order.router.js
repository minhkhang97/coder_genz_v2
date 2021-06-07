const express = require("express");
const OrderDetail = require("../order detail/orderdetail.model");
const Order = require("./order.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const { validOrder } = require("../ultis/validation");
const Customer = require("../customer/customer.model");

router.post("/", async (req, res) => {
  let order = req.body;
  //console.log(order);
  const orderDetails = order.cart;
  const orderDetailsId = await Promise.all(
    orderDetails.map(async (orderDetail) => {
      //console.log(orderDetail.properties);
      const orderDetailNew = new OrderDetail({
        product: orderDetail.productId,
        productId: orderDetail.productId,
        price: orderDetail.price,
        quantity: orderDetail.amount,
        totalPrice: orderDetail.price + orderDetail.amount,
        properties: orderDetail.properties.map((el) => ({
          id: el.id,
          name: el.name,
          options: el.options,
        })),
      });
      const orderDetailResult = await orderDetailNew.save();
      return orderDetailResult._id;
    })
  ).catch((error) => console.log(error));

  console.log(orderDetailsId);
  order.totalPrice = order.cart.reduce(
    (acc, curr) => acc + curr.price * curr.amount,
    0
  );
  order.totalAmount = order.cart.reduce((acc, curr) => acc + curr.amount, 0);
  order.status = [{ code: "001", mess: "cho xac nhan" }];
  const orderNew = new Order(order);
  //await orderNew.save();
  res.json({ order: req.body });
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.get("/groupByDay", async (req, res) => {
  const temp = await OrderDetail.aggregate([
    {
      $project: {
        year: { $year: "$create_at" },
        month: { $month: "$create_at" },
        day: { $dayOfMonth: "$create_at" },
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: { year: "$year", month: "$month", day: "$day" },
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  console.log(temp);
  return res.send("asdhjasg");
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

router.post("/test", validOrder, async (req, res) => {

  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    const t = errors.array();
    return res.status(200).json({ error: errors.array().map((el) => el.mess) });
  }

  const order = req.body;
  let orderDetails = order.cart;
  orderDetails = orderDetails.map(el => ({
    id: el.id,
    productId: el.productId,
    name: el.name,
    price: el.price,
    quantity: el.amount,
    totalPrice: el.price * el.amount,
    properties: el.properties.map(property => ({
      name: property.name,
      options: property.options,
    })),
  }))

  const totalQuantity = orderDetails.map(el => el.quantity).reduce(((acc, curr) => acc + curr), 0);
  const totalPrice = orderDetails.map(el => el.totalPrice).reduce(((acc, curr) => acc + curr), 0);


  //them order trc

  const orderNew = new Order({
    contact: order.contact,
    order_details: orderDetails,
    totalPrice,
    totalQuantity,
    status: [{code: '001', mess: 'chờ xác nhận'}]
  })

  console.log(orderNew);

  //sau day thi them vao customer

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_1);
      const isCustomer = await Customer.findOne({_id: decode.sub});
      //console.log(isCustomer);
      if(isCustomer){
        //them order o day
      }
    } catch {
      console.log("loi");
    }
  }

  //them san pham o day
  res.send("linh tinh");
});

module.exports = router;
