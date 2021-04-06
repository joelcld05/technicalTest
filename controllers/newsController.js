const   {isLoggedIn,checkPermisions}  = require('../middleware/authMiddleware');
const   User          =  require("../models/user"),
        News          =  require("../models/news");

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
                }).sort([['createdAt', -1]]).populate("user", "name").exec();
            let favotites = await User.findById(req.user._id,"favorites");
            return res.render("home",{news:news, favorites:favotites.favorites});
        }
    ],

    getFavoriteNews:[
        isLoggedIn,
        async (req,res) =>{
            let news = await User.findById(req.user._id,"favorites").sort([['createdAt', -1]]).populate("favorites");
            return res.render("favorites",{news:news.favorites});
        }
    ],
    
    getOneNew:[
        isLoggedIn,
        async (req,res)=>{
            let news = await News.findById(req.params.id,{
                "_id": 1,
                "title": 1,
                "urlimg": 1,
                "body":1
            }).populate("user", "name").exec();;
            console.log(news);
            return res.render("new",{news:news});
        }
    ],

    getCreateNew:[
        isLoggedIn,
        checkPermisions,
        (req,res)=>{
            return res.render("createNew");
        }
    ],

    getUpdateNew:[
        isLoggedIn,
        checkPermisions,
        async (req,res)=>{
            let news = await News.findById(req.params.id,{
                "_id": 1,
                "title": 1,
                "urlimg": 1,
                "body":1
            });
            return res.render("updateNew",{news:news});
        }
    ],

    postNewFavorite:[
        isLoggedIn,
        (req,res)=>{
            User.findOneAndUpdate(
                { _id: req.user._id }, 
                { $push: { favorites: req.params.id } },
                (err, user)=>{
                    return res.redirect('back');
                });
        }
    ],

    deleteNewFavorite:[
        isLoggedIn,
        (req,res)=>{
            User.findOneAndUpdate(
                { _id: req.user._id }, 
                { $pull: { favorites: req.params.id } },
                (err, user)=>{
                    return res.redirect('back');
                });
        }
    ],

    deleteNew:[
        isLoggedIn,
        checkPermisions,
        async (req,res)=>{
            await News.deleteOne({_id:req.params.id});
            return res.redirect("/news");      
        }
    ],

    postNew:[
        isLoggedIn,
        checkPermisions,
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
        checkPermisions,
        (req,res)=>{
            News.findOneAndUpdate({_id:req.params.id}, { 
                title: req.body.title,
                body: req.body.body,
                urlimg: req.body.urlimg,
                user: req.user
            }, {upsert: true}, function(err, doc) {
                if (err){
                    console.log(err);
                    return res.redirect("back");
                }else{
                    return res.redirect("/news");
                };
            });

        }
    ]
}