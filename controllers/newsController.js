const   {isLoggedIn}  = require('../middleware/authMiddleware');
const   User          =  require("../models/user"),
        News          =  require("../models/news"),
        passport      =  require("passport");

module.exports = {
    getNews:[
        isLoggedIn,
        async (req,res) =>{
            let news = await News.find({}, {
                "_id": 1,
                "title": 1,
                "urlimg": 1,
                "createdAt": 1,
                "name":1,
                }).populate("user", "name").exec();
            let favotites = await User.findById(req.user._id,"favorites");
            console.log(favotites);
            return res.render("home",{news:news, favorites:favotites});
        }
    ],

    getFavoriteNews:[
        isLoggedIn,
        (req,res) =>{
            return res.render("favorites");
        }
    ],
    
    getOneNew:[
        isLoggedIn,
        (req,res)=>{
            return res.render("register");
        }
    ],

    getCreateNew:[
        isLoggedIn,
        (req,res)=>{
            return res.render("createNew");
        }
    ],



    postNewFavorite:[
        isLoggedIn,
        (req,res)=>{
            User.findOneAndUpdate(
                { _id: req.user._id }, 
                { $push: { favorites: req.params.id } },
                (err, user)=>{
                    return res.redirect("/news");
                });
        }
    ],


    deleteNew:[
        isLoggedIn,
        async (req,res)=>{
            await News.deleteOne({_id:req.params.id});
            return res.redirect("/news");      
        }
    ],

    postNew:[
        isLoggedIn,
        (req,res)=>{
            News.create({ 
                title: req.body.title,
                body: req.body.body,
                urlimg: req.body.urlimg,
                user: req.user
            },  (err, small) => {
                if (err){
                    console.log(err);
                    return res.redirect("/news/create");
                }else{
                    return res.redirect("/news");
                };
            });
        }
    ],


    putNew:[
        isLoggedIn,
        (req,res)=>{
            User.register(
                new User({ 
                    title: req.body.title,
                    body: req.body.body,
                    urlimg: req.body.urlimg,
                    user: req.user
                }),req.body.password,
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
    ]
}