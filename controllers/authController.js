const passport                              =   require("passport");
const {isLoggedIn,goHomeIfLoggedIn}         =   require('../middleware/authMiddleware');


module.exports = {
Home:[
    isLoggedIn,
    (req,res) =>{
        return res.redirect("/news");
    }
],

getLogin:[
    goHomeIfLoggedIn,
    (req,res)=>{
        return res.render("login");
    }
],

postLogin:[
        passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login"
    }),
    (req, res)=>{
        
    }
],

logout:(req,res)=>{
    req.logout();
    return res.redirect("/");
}
}