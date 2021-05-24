const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const applyPassport = require('./ultis/passport');
const passport = require('passport');
const multer = require('multer');
const cors = require('cors');

const port = process.env.PORT | 5000;

mongoose.connect(process.env.DB_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("error", function (error) {
  console.log(error);
});

mongoose.connection.on("open", function () {
  console.log("Connected to MongoDB database.");
});

//import router
const usersRouter = require("./users/users.router");
const productsRouter = require('./product/product.router');
const categoryRouter = require('./category/category.router');

const app = express();

applyPassport(passport)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use("/auth/admin", usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoryRouter);

app.get("/", (req, res) => {
  console.log("sadjhgashj");
  res.send("asdjhasgj");
});



//upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    req.url = "http://localhost:5000/uploads/" + file.originalname;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("photo"), (req, res) => {
  console.log(req.url);
  res.json({url: req.url});
});

app.listen(port, () => console.log("run"));
