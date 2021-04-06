const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    morgan = require('morgan'),
    moment = require('moment'),
    path = require('path');

const auth = require("./routes/authRoutes")
user = require("./routes/userRoutes");
news = require("./routes/newsRoutes");

require('dotenv').config();

//Mongo configuration
mongoose.set('useCreateIndex', true);
mongoose.connect(
    process.env.DB_HOST_MONGO,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//Express configuration
app.use(require("express-session")({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static('public'));

//define variables to be used within ejs
app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.url = req.protocol + "://" + req.get('host');
    res.locals.moment=moment
    next();
});

//Regestering app routes 
app.use('/', auth);
app.use('/', user);
app.use('/', news);

//Listen On Server
app.listen(process.env.APP_PORT, function (err) {
    if (!err) {
        console.log("Server Started At Port 3000");
    }
});