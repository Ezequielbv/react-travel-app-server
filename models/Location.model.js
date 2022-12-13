const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
    {
        city:           {
            type:       String,
            required:   true
        },
        country:        {
            type:       String
        },
        date:           Date,
        coordinates:    [
            {
                type:   Number
            }
        ]
        // userOwnerId:    {
        //     type:       Schema.Types.ObjectId,
        //     ref:        'User'
        // },
        // userOwnerName:  {
        //     type:       Schema.Types.Mixed,
        //     ref:        'User'
        // },
        // notes:  String
    }
)

const Location     = model("Location", locationSchema);
module.exports     = Location;