/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 07:56
 */

var constants = require('../constants');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var transporter = require('./config');


const mailer = {}

//Set and render the template
mailer.setTemplate = function (template) {
    var templateDir = path.join(__dirname, 'templates', template)
    return transporter.templateSender(new EmailTemplate(templateDir), {
        from: {
            name: constants.SYSTEM_NAME,
            address: constants.SYSTEM_EMAIL
        },
    });
}

//Deliver the email
mailer.deliver = function (templateTransporter, to, subject, emailData, callback) {
    templateTransporter({
        to: to,
        subject: subject
    }, emailData, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
            return callback(err, null);
        } else {
            console.log('Email sent: ' + info);
            return callback(null, info);
        }
    });
}


mailer.sendMail = function (to, subject, template, emailData) {
    var self = this;

    //Set template
    var templateTrasnporter = this.setTemplate(template)

    return new Promise(function (resolve, reject) {
        //Deliver email
        self.deliver(templateTrasnporter, to, subject, emailData, function (err, info) {

            if (err != null) {
                reject(err);
            } else {
                resolve(info);
            }

        })
    })

}


module.exports = mailer;