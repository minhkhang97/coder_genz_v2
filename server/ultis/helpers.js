const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const getRandomInt = (min = 100000, max = 900000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const sendMail = (data, email) => {
  const transporter = nodemailer.createTransport({
    // config mail server
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "minhkhangnguyen32@gmail.com", //Tài khoản gmail vừa tạo
      pass: "minhkhang97", //Mật khẩu tài khoản gmail vừa tạo
    },
  });
  let mailOptions = {
    from: "CODER GENZ",
    to: email,
    subject: "xac thuc email",
    text: data,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if(err){
      console.log(err);
    }
  });
}

const createLinkActive = (email) => {
  return "http://localhost:5000/auth/admin/config-email?email=" + email;
}

const hashCode = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(string, salt);
  return hash;
}

module.exports = {getRandomInt, sendMail, createLinkActive, hashCode};
