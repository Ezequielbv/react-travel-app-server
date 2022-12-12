const express = require("express");
const router = express.Router();
const Location = require('../models/Location.model')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/form", (req, res, next) => {
  const { city, date, coordinates } = req.body;
  console.log({ city, date, coordinates });

  // Check the users collection if a user with the same email already exists
  Location.create({ city, date, coordinates })
    .then((location) => {
      console.log("loc ", location);
      res.status(201).json({ location: location });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

module.exports = router;
