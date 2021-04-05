const passport              =   require("passport");
const {isLoggedIn,goHomeIfLoggedIn}          =   require('../middleware/authMiddleware');

exports.Home=[
    isLoggedIn,
    (req,res) =>{
        return res.render("home");
    }
]

exports.getLogin=[goHomeIfLoggedIn,(req,res)=>{
    return res.render("login");
}]

exports.postLogin=[
        passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login"
    }),
    (req, res)=>{
        
    }
]

exports.logout=(req,res)=>{
    req.logout();
    return res.redirect("/");
}
