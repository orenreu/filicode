/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 16/06/2016
 * Time: 21:16
 */


const router = require('express').Router()
const mailer = require('../utils/mailer')

router.get('/', function(req,res) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    }
    else
        res.json({})
})



router.get('/mail', function(req, res) {
    mailer.sendMail('orenreu@gmail.com',"Reset Password", 'password', {data:{link:"http://benzomedia.com"}}).then(function(result){
        console.log("this is success: "+result);
    }).catch(function(error){
        console.log("this is error: "+error);
    })

});


module.exports = router