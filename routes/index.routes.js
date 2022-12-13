const router    = express.Router();
const express   = require("express");
const Location  = require('../models/Location.model');
const User      = require('../models/User.model');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.get('/profile', (req, res, next) => {
  Location.find()
    .then(location => {
      console.log(location);
      res.status(201).json({ location: location })
      return location
    })
    // .then((loc) => console.log(loc))
    .catch(err => console.log(err));
});

router.post("/form", (req, res, next) => {
  const { city, country, date, coordinates, user } = req.body;
  console.log("Request is:", {city, country, date, coordinates, user})
  try {
    const location = await Location.create({ city, country, date, coordinates });
    console.log("Location is: ", location)
    const person = await User.findByIdAndUpdate(user._id, { location: location._id });
    person.populated('location');
    console.log(person)
    res.status(201).json({ location: location });
  }
  catch(error) {
    console.log(error);
  }
});

router.get('/user-coordinates', (req, res, next) => {
  Location.find()
  .then(coordinates => {
    res.status(201).json({ coordinates: coordinates });
    return coordinates
  })
  .catch(err => console.log(err));
});


module.exports = router;
