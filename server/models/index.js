/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 13/06/2016
 * Time: 17:03
 */

var config = require("./config.js");

// Import rethinkdbdash
var thinky = require('thinky')(config.rethinkdb);
var r = thinky.r;
var type = thinky.type;


const User = thinky.createModel('User', {
    id: type.string(),
    providerId: type.string(),
    provider: type.string(),
    firstName: type.string(),
    lastName: type.string(),
    email: type.string(),
    password: type.string(),
    photo: type.string(),
    role: type.string().enum(["admin", "advertiser", "publisher"])
})


User.define('validPassword', function (password) {
    var self = this;
    console.log(self.password === password);
     return self.password === password;
})


User.ensureIndex("email", function (doc) {
    return doc('email')
});

User.ensureIndex('provider_providerId', function (doc) {
    return [doc('provider'), doc('providerId')]
});

module.exports = {User, r};