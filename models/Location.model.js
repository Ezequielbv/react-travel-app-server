const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
    {
        city:           {
            type:       String,
            required:   true
        },
        date:           Date,
        userOwnerId:    {
            type:       Schema.Types.ObjectId,
            ref:        'User'
        },
        userOwnerName:  {
            type:       Schema.Types.Mixed,
            ref:        'User'
        },
        coordinates:    [
            {
                type:   Number
            }
        ],
        notes:  String
    }
)

const Location     = model("Location", locationSchema);
module.exports     = Location;