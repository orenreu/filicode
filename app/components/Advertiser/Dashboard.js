/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 15/06/2016
 * Time: 14:55
 */
var React = require('react');


var AdvertiserDashboard = React.createClass({
    render: function () {
        return (
            <div>
                <h2 className="text-center">
                    You Are an Advertiser
                </h2>
                <p>Yes, you are</p>
            </div>
        );
    }
});

module.exports = AdvertiserDashboard;