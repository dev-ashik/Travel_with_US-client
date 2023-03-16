const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloadr = require('image-downloader');
const multer  = require('multer'); // to upload photo
const fs = require('fs');

const User = require("./models/User");
const PlaceModel = require("./models/Place");
const BookingsModel = require("./models/Booking");
require("dotenv").config();

const app = express();
const port = 5000;

const beryptSalt = bcrypt.genSaltSync(10);
const jwtsecret = "dfsoiiuiuui";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
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

const getuserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtsecret, {}, async (err, userData) => {
      if(err) throw err;
      resolve(userData);
    });
  })
}

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

// console.log(__dirname)
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';

  await imageDownloadr.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  })
  res.json(newName);
})

const photoMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath);
    // uploadedFiles.push(newPath.replace('uploads//', ''));
  }
  res.json(uploadedFiles);
})

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  // console.log(perks)
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.create({
      owner: userData.id,
      title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,
      price
    });
    res.json(placeDoc);
  });
})

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    const {id} = userData;
    const allPlaces = await PlaceModel.find({owner:id});
    res.json(allPlaces);
  });
});

app.get('/places/:id', async (req, res) => {
  const {id} = req.params;
  const place = await PlaceModel.findById(id);
  res.json(place);
});
    
app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;


  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if(err) throw err;
    const placeDoc = await PlaceModel.findById(id);

    // console.log(userData.id);
    // console.log(placeDoc.owner.toString());
    if(userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
      })
      await placeDoc.save();
      res.json('ok');
    }
  });
} )


app.get('/places', async (req, res) => {
  const allPlaces = await PlaceModel.find();
  res.json(allPlaces);
})

app.post('/bookings', async (req, res) => {
  const userData = await getuserDataFromReq(req);
  const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
  BookingsModel.create({
    place, checkIn, checkOut, numberOfGuests, name, phone, price, user:userData.id
  }).then(( doc)=>{
    res.json(doc);
  }).catch(()=>{
    throw err;
  });
})


app.get('/bookings', async (req, res) => {
  const userData = await getuserDataFromReq(req);
  const bookingsData = await BookingsModel.find({user:userData.id}).populate('place');
  // console.log(bookingsData)
  res.json(bookingsData);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
