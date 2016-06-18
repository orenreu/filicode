/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 16:09
 */

var User = require('../../models').User;
var constants = require('../constants')
var passport = require('passport')
const router = require('express').Router();
const mailer = require('../mailer')
var CryptoJS = require('crypto-js');
const moment = require('moment')
require('./passport');


// =========================================================================
// SIGNUP===================================================================
// =========================================================================

function handleSignup(req, res) {

    User.getAll(req.body.email, {index: 'email'}).run().then(function (users) {
        if (users.length == 0) {

            User.save({
                email: req.body.email,
                password: CryptoJS.MD5(req.body.password).toString(),
                role: req.body.role,
                updated_at:  new Date()
            }).then(function (user) {

                req.login(user, function(err) {
                    if (err) { return next(err); }
                    res.status(200).send(JSON.stringify({success: true, user: user}))
                });

            }).error(handleError(res));

        } else {
            //Email already is in the DB
            res.status(200).send(JSON.stringify({success: false, message: 'Email already exists'}))
        }


    })
};


// =========================================================================
// ASK TO RESET PASSWORD====================================================
// =========================================================================

function sendResetPasswordEmail(req, res) {


    User.getAll(req.body.email, {index: 'email'}).run().then(function (users) {
        if (users.length == 0) {
            //No user with this email in the DB
            res.status(200).send(JSON.stringify({success: false, message: 'User does not exist.'}))
        } else {

            //send response to frontend
            res.status(200).send(JSON.stringify({success: true, message: 'Email was sent'}))

            const user = users[0];

            //Generate code
            const code = Math.random().toString(36).substr(2, 9);

            //store code in db under user
            User.get(user.id).update({
                code: code,
                code_updated_at: new Date()
            }).run().then(function (user) {

                var emailData = {
                    data:{
                        link: constants.SYSTEM_URL +"/password/reset/"+user.id+"/"+code
                    }
                }
                //send email to user with proper link
                mailer.sendMail(user.email, 'Reset Password', 'password', emailData).then(function(result){

                }).catch(function(error){
                    res.send(500, {error: error.message});
                })

            }).error(handleError(res));




        }

    });

}



// =========================================================================
// RESET PASSWORD====================================================
// =========================================================================
function resetPassword(req, res) {
   
    User.get(req.body.userId).run().then(function(user){

        if(user.code !== req.body.code) {
            //code doesn't match
           return res.status(200).send(JSON.stringify({success: false, message: 'Reset code mismatch. Please try again'}))
        }

        const now = new moment();
        const codeDatePlusDay = moment(user.code_updated_at).add(1,'days');

        if(now.isAfter(codeDatePlusDay)){
            //code expired
            return res.status(200).send(JSON.stringify({success: false, message: 'Reset code expired. Please try again'}))
        }

        User.get(user.id).update({
            password:CryptoJS.MD5(req.body.password).toString(),
            code: '',
            code_updated_at: null
        }).then(function(user){
            return res.status(200).send(JSON.stringify({success: true, message: 'Password was successfully reset'}))
        }).error(handleError(res))

    }).error(handleError(res));

};



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
    router.post('/signup', handleSignup);

//Handle requests for session flash messages
    router.get('/flash', function (req, res) {
        res.status(200).send(JSON.stringify(req.flash('error')))
    })


//Handle Logout
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

//Handle Request to reset password
    router.post('/password', sendResetPasswordEmail);

//Handle Request to reset password
    router.post('/password/reset', resetPassword);

    function handleError(res) {
        return function (error) {
            console.log(error.message);
            return res.send(500, {error: error.message});
        }
    }


    module.exports = router;