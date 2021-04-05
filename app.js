const   express               =  require('express'),
        app                   =  express(),
        mongoose              =  require("mongoose"),
        passport              =  require("passport"),
        bodyParser            =  require("body-parser"),
        LocalStrategy         =  require("passport-local"),
        User                  =  require("./models/user")
        morgan                =  require('morgan');

const   auth = require("./routes/authRoutes")
        user = require("./routes/userRoutes");

require('dotenv').config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_HOST_MONGO);

app.use(require("express-session")({
    secret:process.env.APP_KEY,
    resave: false,          
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended:true }))
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static',express.static('public'))

//Regestering app routes 
app.use('/', auth);
app.use('/', user);

//Listen On Server
app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
});