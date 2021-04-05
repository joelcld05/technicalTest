const   {isLoggedIn}  = require('../middleware/authMiddleware');
const   User          =  require("../models/user"),
        passport              =  require("passport");

exports.getProfile=[
    isLoggedIn ,
    (req,res) =>{
        return res.render("userprofile");
    }
]

exports.getRegister=(req,res)=>{
    res.render("register");
}

exports.postRegister=(req,res)=>{
    User.register(
        new User({username: req.body.username, password:"", roles:['Reader']}),req.body.password,
        function(err,user){
        if(err){
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,function(){
                return res.redirect("/");
            });
        }
    });
}