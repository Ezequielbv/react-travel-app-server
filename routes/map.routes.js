/* ------ Install frameworks and functions ------ */
const { response } = require('express');
const express     = require('express');
const isLoggedIn  = require('../middleware/isLoggedIn');
const router      = express.Router();
const Location    = require('../models/Location.model');
const User        = require('../models/User.model');

/* ------ Get coordinates of all users ------ */
router.get('/user-coordinates', (req, res, next) => {
    Location.find()
    .then(coordinates => {
      res.json({ coordinates });
    })
    .catch(err => console.log(err));
  });

/* ------ Get coordinates of a specific user ------ */
router.get('/user-coordinates/:userOwnerId', (req, res, next) => {
    const userId = req.params.userOwnerId;
    // console.log(req.params);
    console.log("user X coordinates: ", userId);
    Card.find({ userOwnerId: userId })
    .then(coordinates => {
        res.json({ coordinates });
    })
    .catch(err => console.log(err));
});

  


