/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 16/06/2016
 * Time: 00:34
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Axios = require('axios');
var CryptoJS = require('crypto-js');


var Signin = React.createClass({
    getInitialState() {
        return {
            message: null
        }
    },
    componentWillMount(){
        var self = this;
        Axios.get('/auth/flash')
            .then(function (response) {
                self.setState({
                    message: response.data[0]
                })
                console.log(response);
            }).catch(function (response) {

        })
    },
    render: function () {
        return (
            <div>
                <h1 className="text-center" style={{marginBottom:30}}>Sign in to Filicode</h1>
                <div className="facebook-signin">
                    <div className="text-center">
                        <a href="/auth/facebook">
                            <button className="btn btn-facebook">
                                <i className="fa fa-facebook-square"></i> &nbsp;  Sign in with Facebook
                            </button>
                        </a>
                    </div>
                    <div>
                        <h5 className="or-sperator text-center">Or</h5>
                    </div>
                </div>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

                    <form action="/auth/login" method="POST">
                        <div className="form-group">
                            <label htmlFor="email_input">Email</label>
                            <input name="email" id="email_input" type="email" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_input">Password</label>
                            <input name="password" id="password_input" type="password"
                                   className="form-control" required/>
                            <p style={{paddingTop:5}}>Forgot password? <a href="/auth/password">Click here</a></p>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
                        </div>
                    </form>
                    <p className="text-center">First time here? <a href="/signup">Sign up</a></p>
                </div>
                {this.state.message ? <Alert message={this.state.message} />: null}
            </div>
        );
    }
});


const Alert = (props) => (
    <div style={{marginTop:20}} className="alert alert-danger col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <h5 className="text-center">{props.message}</h5>
    </div>
)

module.exports = Signin;