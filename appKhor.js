// impurt function
const { extend } = require("underscore");
const logger = require("./middelwares/logger");
const express = require("express");
const helmet = require("helmet");
const morgon = require("morgan");

const homeRoute = require('./rourtes/home-route');
const paperRoute = require('./rourtes/papers-route');
const userRoute = require('./rourtes/users-route');
const errorHandler = require("./middelwares/error_handler");

// To access the environment variable
require('dotenv').config();

const startdebug = require("debug")("startup");

const app = express();

//Built-in middleware---------------------------
// Built-in middleware function for get body POST
app.use(express.json());

// برای یکسری درخواست‌های قدیمی ارسال باشه با فرمت قدیمی
// key=value&kay2=value => JSON
// for warnning :body-parser deprecated undefined extended: provide extended option appKhor.js:41:17 => {extended:true}
app.use(express.urlencoded({extended:true}));

// for static file (در کدارم فولدر قرار داره)
app.use(express.static('public'));

// third party middleware--------------------- impurt middlewar Express.com
// middleware for security
app.use(helmet());

startdebug("asdfsdfa");
// middlewar for information
// app.use(morgon("tiny"))
if (app.get("env") === "development") app.use(morgon("tiny"));

// middlewar for debug = console.log 


// custom middleware----------------------------
app.use(logger.log);
app.use((req,res,next)=>{
    console.log("authentication...");
    next();
});

// Route in middleware
app.use('/api/papers', paperRoute);

// Authentication
app.use('/api/users', userRoute);


// For Home Page
app.get("/" , homeRoute);

// middelwer for Error
app.use(errorHandler)

// Environment variable (PORT) => .env file
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`be porte ${port} vasle`)
});
