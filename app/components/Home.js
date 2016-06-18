/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:33
 */
var React = require('react');
var Axios = require('axios');


var Home = React.createClass({
    sendMail: function(){
        Axios.get('/api/user/mail').then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    },
    render: function () {
        return (
            <div>
                <h2 className="text-center">
                    You Are Home
                </h2>
                <button onClick={this.sendMail}>Send Mail</button>
            </div>
        );
    }
});

module.exports = Home;