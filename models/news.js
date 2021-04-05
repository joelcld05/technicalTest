const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema(
    {
        title:{ type: String,  required:true },
        content:{ type: String,  required:true },
        imageUrl:{ type: String,  required:true }
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);