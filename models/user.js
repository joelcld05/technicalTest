const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema(
    {
        username:{ type: String,  required:true, unique: true },
        password:{ type: String,  required:true },
        roles:[{ type: String,  enum : ['Reader','Editor'], default: ['Reader'] }]
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);