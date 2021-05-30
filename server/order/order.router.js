const express = require("express");
const Order = require('./order.model');

const router = express.Router();

router.post("/", async (req, res) => {
  let order = req.body;
  order.totalPrice = order.cart.reduce(
    (acc, curr) => acc + curr.price * curr.amount,
    0
  );
  order.totalAmount = order.cart.reduce((acc, curr) => acc + curr.amount, 0);
  order.status = [{code: '001', mess: 'cho xac nhan'}];
  console.log(order);
  const orderNew = new Order(order);
  await orderNew.save();
  res.json({ order: req.body });
});

router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
})

module.exports = router;
