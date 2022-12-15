const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
        title: String,
        description: {
            type:       String,
            required:   true
        },
        location: {
            type:       Schema.Types.ObjectId,
            ref:        'Location'
        }
    }
);


const Note     = model("Note", noteSchema);
module.exports = Note;