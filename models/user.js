const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema(
    {
        name:{ type: String,  required:true},
        username:{ type: String,  required:true, unique: true, sparse: true },
        roles:[{ type: String,  enum : ['Reader','Editor'], default: ['Reader'] }],
        favorites :[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'News'
        }]
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);