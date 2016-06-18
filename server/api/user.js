/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 16/06/2016
 * Time: 21:16
 */


const router = require('express').Router()


router.get('/', function(req,res) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    }
    else
        res.json({})
})


module.exports = router