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
      console.log(location);
      res.status(201).json({ location: location })
      return location
    })
    // .then((loc) => console.log(loc))
    .catch(err => console.log(err));
});

router.post("/form", (req, res, next) => {
  const { city, country, date, coordinates, user } = req.body;
  console.log({ city, country, date, coordinates, user });

  // Check the users collection if a user with the same email already exists
  Location.create({ city, country, date, coordinates })
    .then((location) => {
      /*  console.log("loc ", location); */
      res.status(201).json({ location: location });
      return location
    })
    .then((location) => {
     const person = User.findByIdAndUpdate(user._id, { location: location._id });
     return person;  
    })
    .then((person) => {
      person.populate('location').exec(function (err, person) {
        if (err) return handleError(err);
        console.log(person);
      });
      return person
    })
    .then((person) => console.log(person))
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});


// DELETE A LOCATION
router.delete('/locations/:locationId', (req, res, next) => {
  const { locationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Location.findByIdAndRemove(locationId)
  .then(() =>
      res.json({
        message: `Location ${projectId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
