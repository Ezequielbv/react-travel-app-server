const express   = require("express");
const mongoose = require("mongoose");
const router    = express.Router();
const Location  = require('../models/Location.model');
const User      = require('../models/User.model');
const Note      = require('../models/Note.model');


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

router.post("/form", async (req, res, next) => {
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



//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get("/locations/:locationId", (req, res, next) => {
  const { locationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Location document has `notes` array holding `_id`s of Note documents
  // We use .populate() method to get swap the `_id`s for the actual Note documents
  Location.findById(locationId)
    .populate("notes")
    .then((location) => res.status(200).json(location))
    .catch((error) => res.json(error));
});

// DELETE A LOCATION
router.delete('/locations/:locationId', (req, res, next) => {
  const { locationId } = req.params;
  // console.log("HERE BE", locationId);

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Location.findByIdAndRemove(locationId)
  .then(() =>
      res.json({
        message: `Location ${locationId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
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
