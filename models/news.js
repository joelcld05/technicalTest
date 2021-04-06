const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema(
    {
        title:{ type: String,  required:true },
        body:{ type: String,  required:true },
        urlimg:{ type: String,  required:true },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("News",UserSchema);