/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 15/06/2016
 * Time: 17:05
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Axios = require('axios');



var Signup = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            email: '',
            password: '',
            verify_password: '',
            message: ''
        };
    },
    handleChange: function () {
        this.setState({
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value,
            verify_password: ReactDOM.findDOMNode(this.refs.verify_password).value
        });
    },
    showMessage(message) {
        this.setState({
            message: message
        })
    },
    handleSubmit: function (e) {
        e.preventDefault();
        const self = this;

        if (this.state.password != this.state.verify_password) {
            self.showMessage("Passwords don't match");
            return
        }
            Axios.post('/auth/signup', {
                    email: this.state.email,
                    password: this.state.password,
                    role: 'advertiser'
                })
                .then(function (response) {
                    if(response.data.success){
                        self.context.router.push("/");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });



    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.message !== this.state.message;
    },
    render: function () {
        return (
            <div>
                <div className="facebook-signin">
                    <h1 className="text-center" style={{marginBottom:30}}>Signup to Filicode</h1>
                    <div className="text-center">
                        <a href="/auth/facebook">
                            <button className="btn btn-facebook">
                                <i className="fa fa-facebook-square"></i> &nbsp;  Signup with Facebook
                            </button>
                        </a>
                    </div>
                    <div>
                        <h5 className="or-sperator text-center">Or</h5>
                    </div>
                </div>

                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email_input">Email</label>
                            <input id="email_input" ref="email" type="email" className="form-control"
                                   onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_input">Password</label>
                            <input id="password_input" ref="password" type="password" className="form-control"
                                   onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="verify_password_input">Verify Password</label>
                            <input id="verify_password_input" ref="verify_password" type="password"
                                   className="form-control" onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
                        </div>
                    </form>
                    <p className="text-center">Already have an account? <a href="/login">Sign in</a></p>
                </div>
                <div className="error-message col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                    <h5 className="text-center message text-danger">{this.state.message}</h5>
                </div>
            </div>
        );
    }
});

module.exports = Signup;