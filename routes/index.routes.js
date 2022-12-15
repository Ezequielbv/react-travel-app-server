const express = require("express");
const router = express.Router();
const Location = require('../models/Location.model');
const User = require('../models/User.model');


router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.get('/profile', (req, res, next) => {
  Location.find()
    .then(location => {
      res.status(201).json({ location: location })
      return location
    })
    // .then((loc) => console.log(loc))
    .catch(err => console.log(err));
});

router.post("/form", async (req, res, next) => {
  const { city, country, date, userOwnerId, coordinates } = req.body;
  console.log("Request is:", { city, country, date, userOwnerId, coordinates })
  try {
    const location = await Location.create({ city, country, date, userOwnerId, coordinates });
    res.status(201).json({ location: location });
  }
  catch (error) {
    console.log(error);
  }
});

/* ************** */
/* MAP ROUTES     */
/* ************** */

router.get('/user-coordinates', (req, res, next) => {
  Location.find()
    .populate('userOwnerId')
    .then(coordinates => {
      res.status(201).json({ coordinates: coordinates });
      return coordinates
    })
    .catch(err => console.log(err));
});

// Coordinates of specific user
router.get('/user-coordinates/:userOwnerId', (req, res, next) => {
  const userId = req.params.userOwnerId;
  console.log("User ID is: ", req.params);
  console.log("user coordinates called of ID: ", userId);
  Location.find({ userOwnerId: userId })
    .then(coordinates => {
      res.json({ coordinates });
    })
    .catch(err => console.log(err));
});

module.exports = router;
