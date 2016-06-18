/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 15/06/2016
 * Time: 15:34
 */

var User = require('../../models').User;
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var CryptoJS = require('crypto-js');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.get(id).run().then(function (user) {
        done(null, user);
    }).error(function(err){
        done(err, null)
    });
});



// =========================================================================
// SIGNUP===================================================================
// =========================================================================

function handleSignup(req, res) {

    User.getJoin(req.body.email, {index: 'email'}).run().then(function (users) {
        if (users.length == 0) {

            User.save({
                email: req.body.email,
                password: CryptoJS.MD5(req.body.password).toString(),
                role: req.body.role
            }).then(function (user) {
                res.status(200).send(JSON.stringify({success: true, user: user}))
            }).error(function (error) {
                res.status(500).send({error: error.message})
            });
        } else {
            //Email already is in the DB
            res.status(200).send(JSON.stringify({success: false, message: 'Email already exists'}))
        }


    })
};


// =========================================================================
// LOCAL====================================================================
// =========================================================================

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        password = CryptoJS.MD5(password).toString();
        User.getAll(username, {index: 'email'}).run().then(function (users) {
            if (!users[0]) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (!users[0].validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            
            return done(null, users[0]);

        }).error(function (err) {
            return done(err);
        });
    }
));


// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        enableProof: true,
        profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'picture']
    },

    // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        User.getAll(['facebook', profile.id], {index: 'provider_providerId'}).run().then(function (users) {
            if (users.length == 0) {
                // new user

                return User.save({
                    providerId: profile.id,
                    provider: 'facebook',
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                })
            }
            else {
                return users[0]
            }
        }).then(function (user) {
            return done(null, {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                photo: user.photo,
                isAdmin: user.isAdmin
            })
        }).catch(
            function (err) {
                done(err)
            }
        )

    }));


//Handle Facebook Login
router.get('/facebook',
    passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
    }))
//Handle Facebook callback
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

//Handle Login
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

//Handle Signup
router.post('/signup', handleSignup)

router.get('/flash', function(req, res) {
    res.status(200).send(JSON.stringify(req.flash('error')))
})


//Handle Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;




