const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const port = 5000;
const beryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
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
    res.json("found");
  } else {
    res.json("not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//   booking
//   SwqF2h3bb04PNLiH
