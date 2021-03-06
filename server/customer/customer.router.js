const express = require("express");
const { registerValid, loginValid } = require("../ultis/validation");
const { validationResult } = require("express-validator");
const Customer = require("./customer.model");
const { hashCode } = require("../ultis/helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      mess: error.msg,
    };
  },
});

router.post("/register", registerValid, async (req, res) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    const t = errors.array();
    console.log(t);
    return res.status(200).json({ error: errors.array().map((el) => el.mess), success: false });
  }

  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(200).json({ error: ["tài khoản email đã tôn tại"] });
    }

    const passwordHash = await hashCode(password);

    const customerNew = new Customer({ email, password: passwordHash });

    const result = await customerNew.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch {
    return res
      .status(200)
      .json({ error: ["đăng ký thông thành công, vui lòng thử lại"] });
  }
});

router.post("/login", loginValid, async (req, res) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    const t = errors.array();
    console.log(t);
    return res.status(200).json({ error: errors.array().map((el) => el.mess), success: false });
  }
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(200).json({ error: ["tài khoản không chính xác"], success: false });
    }

    //kiem tra mat khau
    const isPassword = await bcrypt.compare(password, customer.password);
    if (!isPassword) {
      return res.status(200).json({ error: ["mat khau khong chinh xac"] });
    }
    const accessToken = jwt.sign({ sub: customer._id }, process.env.SECRET_1);
    const refreshToken = jwt.sign({ sub: customer._id }, process.env.SECRET_2);

    return res.status(200).json({ token: { accessToken, refreshToken }, success: true });
  } catch {
    return res
      .status(403)
      .json({ error: ["khong the dang nhap"], success: false });
  }
});

router.get("/read", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_1);
      const isCustomer = await Customer.findOne({ _id: decode.sub }).populate({
        path: "orders",
      });
      //console.log(isCustomer);
      if (isCustomer) {
        return res.status(200).json({ success: true, data: isCustomer });
      }
    } catch {
      return res.status(403).json({ error: ["đăng nhập không thành công"] });
    }
  }
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {

});

module.exports = router;
