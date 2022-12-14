const express   = require("express");
const mongoose = require("mongoose");
const router    = express.Router();
const Location  = require('../models/Location.model');
const User      = require('../models/User.model');
const Note      = require('../models/Note.model');


//CREATE new note
router.post("/notes", (req, res, next) => {
  const { title, description, locationId } = req.body;
  console.log({ title, description, locationId })

  Note.create({ title, description, location: locationId })
    .then((newNote) => {
      return Location.findByIdAndUpdate(locationId, {
        $push: { notes: newNote._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//DELETE a note
router.delete('/notes/:noteId', (req, res, next) => {
  const { noteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Note.findByIdAndRemove(noteId)
  .then(() =>
      res.json({
        message: `Location ${noteId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});


router.put("/notes/:noteId", (req, res, next) => {
  const { noteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Note.findByIdAndUpdate(noteId, req.body, { new: true })
    .then((updatedNote) => res.json(updatedNote))
    .catch((error) => res.json(error));
});

module.exports = router;