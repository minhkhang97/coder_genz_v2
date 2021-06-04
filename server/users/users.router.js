const express = require("express");
require("dotenv").config();
const passport = require("passport");
const {
  loginValid,
  registerValid,
  emailValid,
} = require("../ultis/validation");
const nodemailer = require("nodemailer");
const {
  getRandomInt,
  sendMail,
  createLinkActive,
  hashCode,
} = require("../ultis/helpers");
const router = express.Router();
const User = require("./users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//tu accessToken tra ve thong tin user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    return res.status(200).json(req.user);
  }
);

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      mess: error.msg,
    };
  },
});

//login
router.post("/login", loginValid, async (req, res) => {
  const errors = myValidationResult(req);

  if (!errors.isEmpty()) {
    const t = errors.array();
    console.log(t);
    return res.status(200).json({ error: errors.array().map((el) => el.mess) });
  }
  //kiem tra xem email da ton tai chua
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //email chua tao tai khaon
  if (!user) {
    return res.status(200).json({ error: ["tai khoan email khong dung"] });
  }

  //email chua kich hoat tai khaon
  if (user && user.isActive === false)
    return res.status(200).json({
      error: ["tai khoan chua duoc kich hoat"],
      linkActive: createLinkActive(email),
    });

  const temp = await bcrypt.compare(password, user.password);
  //da kich hoat tai khoan nhung sai mat khau
  if (!temp)
    return res.status(200).json({ error: ["mat khau khong chinh xac"] });

  //dang nhap thanh cong
  //tao token
  const accessToken = jwt.sign({ sub: user._id }, process.env.SECRET_1);
  const refreshToken = jwt.sign({ sub: user._id }, process.env.SECRET_2);

  return res.status(200).json({ token: { accessToken, refreshToken } });
});

router.post("/register", registerValid, async (req, res) => {
  //kiem tra dau vao
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  //
  const { email, password } = req.body;

  //kiem tra email da ton tai chua

  //tai khoan da ton tai
  const user = await User.findOne({ email });
  if (user && user.isActive === true)
    return res.status(400).json({ error: "tai khoan da ton tai" });

  //tai khoan chua kich hoat
  if (user && user.isActive === false) {
    //tao link kich hoat tai khoan co dang /admin/auth/config-email?email=...
    const linkActive = createLinkActive(email);

    //sinh ma code
    const code = getRandomInt();

    //cap nhat code trong csdl
    await User.findOneAndUpdate({ email }, { code });

    //gui mail
    sendMail("kich hoat email", `ma kich hoat ${code}`, email);

    return res.status(400).json({
      error: "tai khoan chua duoc kich hoat",
      linkActive,
    });
  }

  //tai khoan chua ton tai

  //ma hoa mat khau
  const passwordHash = await hashCode(password);

  //sinh code
  const code = getRandomInt();

  //tao tai khoan
  const userNew = new User({ email, password: passwordHash, code });
  const result = await userNew.save();

  const linkActive = createLinkActive(email);

  //gui email
  sendMail("kich hoat email", `ma kich hoat ${code}`, email);

  return res.status(200).json({
    email: result.email,
    linkActive,
  });
});

router.post("/config-email", async (req, res) => {
  //link xac thuc email dang: /config-email?email=...

  //kiem tra cem email voi code co ton tai khong da
  const { email } = req.query;
  const { code } = req.body;

  //ko nhap vao email
  if (!email) return res.status(400).json({ mess: "loi" });

  const user = await User.findOne({ email });
  //email nhap vao sai
  if (!user) return res.status(400).json({ mess: "email khong chinh xac" });

  //email dung nhung da kich hoat
  if (user && user.isActive === true)
    return res.status(400).json({ mess: "email da kich hoat" });

  //email chua kich hoat

  //ma code khong dung
  if (user.code !== code)
    return res.status(400).json({ error: "ma kich hoat khong dung" });

  //kich hoat tai khoan
  await User.findOneAndUpdate({ email }, { isActive: true });

  return res.status(200).json({ mess: "kich hoat tai khoan thanh cong" });
});

//gui lai ma kich hoat
router.post("/send-email", async (req, res) => {
  //link  dang: /config-email?email=...
  const { email } = req.query;

  //kiem tra email da ton tai hay chua
  if (!email) return res.status(400).json({ mess: "nhap dia chi email" });

  //kiem tra email da dang ky chua
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ mess: "email chua dang ky" });

  //email da dang ky va  da kich hoat
  if (user && user.isActive === true)
    return res.status(400).json({ mess: "email da kich hoat" });
  //email da dang ky nhung chua kich hoat
  const code = getRandomInt();
  await User.findOneAndUpdate({ email }, { code });
  sendMail("kich hoat email", `ma kich hoat la ${code}`, email);
  return res.status(200).json({ mess: "gui email thanh cong" });
});

router.post("/forget-password", emailValid, async (req, res) => {
  const errors = myValidationResult(req);

  if (!errors.isEmpty()) {
    const t = errors.array();
    console.log(t);
    return res.status(200).json({ error: errors.array().map((el) => el.mess) });
  }

  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({ error: ["tài khoản không đúng"] });
  }
  try {
    const code = getRandomInt();
    console.log(code);
    const hash = await hashCode(String(code));
    console.log(hash);
    const userAfter = await User.findOneAndUpdate(
      { email },
      { password: hash },
      { new: true }
    );
    console.log(userAfter);
    sendMail("lấy lại mật khẩu", `email ${email} có mật khẩu mới là ${code}`, email);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(200).json({ error: ["Lỗi vui lòng thử lại"] });
  }
});

module.exports = router;
