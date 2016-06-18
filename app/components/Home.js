/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:33
 */
var React = require('react');




var Home = React.createClass({
    doSomething: function(){

    },
    render: function () {
        return (
            <div>
                <h2 className="text-center">
                    You Are Home
                </h2>
                <button onClick={this.doSomething}>Do Something</button>
            </div>
        );
    }
});

module.exports = Home;