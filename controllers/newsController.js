const   {isLoggedIn}  = require('../middleware/authMiddleware');
const   User          =  require("../models/user"),
        passport              =  require("passport");

exports.getNews=[
    isLoggedIn ,
    (req,res) =>{
        return res.render("home");
    }
]

exports.getFavoriteNews=[
    isLoggedIn ,
    (req,res) =>{
        return res.render("favorite");
    }
]


exports.getOneNew=(req,res)=>{
    res.render("register");
}



exports.postNew=(req,res)=>{
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


exports.putNew=(req,res)=>{
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