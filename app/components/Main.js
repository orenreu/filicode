/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:35
 */
var React = require('react');
import ToolBar from './ToolBar';
import Axios from 'axios'

var Main = React.createClass({
    getInitialState() {
        return {
            user: {}
        }
    },
    componentWillMount(){
        Axios.get('/api/user').then( (response) => {
                this.setState({
                    user: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    render: function () {
        return (
            <div className="main-container">
                <ToolBar user={this.state.user} />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Main;