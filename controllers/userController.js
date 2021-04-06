const   {isLoggedIn}  = require('../middleware/authMiddleware');
const   User          =  require("../models/user"),
        passport              =  require("passport");

module.exports = {

    getProfile:[
        isLoggedIn ,
        (req,res) =>{
            return res.render("userprofile");
        }
    ],
    
    getRegister:[
        (req,res)=>{
            res.render("register");
        }
    ],

    postRegister:[
        (req,res)=>{
            User.register(
            new User({name: req.body.name,username: req.body.username, password:req.body.password, roles:['Reader']}),req.body.password,
            function(err,user){
            if(err){
                console.log(err);
                return res.render("register");
            }else{
                passport.authenticate("local")(req,res,function(){
                    return res.redirect("/");
                });
            }
        });
    }
    ]
        
}