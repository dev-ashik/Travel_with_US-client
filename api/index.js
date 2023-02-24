const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const port = 5000;

const beryptSalt = bcrypt.genSaltSync(10);
const jwtsecret = "dfsoiiuiuui";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, beryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    // console.log(userDoc)
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          // name: userDoc.name
        },
        jwtsecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  // console.log(first);

  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err;
      // console.log(userData.id)
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json("Error");
  }
});

app.post('/logout', (req, res) => {
  // res.cookie('token', "").json(true);
  res.clearCookie('token').json(true);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
