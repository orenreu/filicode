/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:22
 */
const path = require('path');
var webpack = require("webpack");
const cookieParser = require('cookie-parser')
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser')
const express = require('express');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var Auth = require('./server/utils/auth')
var User = require('./server/api/user')

const app = new express();

app.use(session({ secret: 'smiley tuesday', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Connect Database
require('./server/models');


//Set up webpack
var compiler = webpack(webpackConfig);
compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, function(err, stats) {
    console.log(err);
});


// Serve all files from public directory
app.use(express.static('public'))

function serveIndex(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}


//Routes to app
app.get('/', serveIndex);
app.get('/advertiser', serveIndex);
app.get('/signup', serveIndex);
app.get('/login', serveIndex);
app.get('/password', serveIndex);
app.get('/password/reset/:userId/:code', serveIndex);




//Routes to api
app.use('/auth', Auth);
app.use('/api/user', User);






var server = app.listen(3000, function() {
    console.log("Lisetning on port "+ server.address().port);
});