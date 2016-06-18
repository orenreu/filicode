/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 19:31
 */

const React = require('react');
const ReactDOM = require('react-dom')
const Axios = require('axios');


var PasswordReset = React.createClass({
    getInitialState() {
        return {
            password: '',
            verify_password: '',
            message: '',
            submitted: false
        }
    },
    handleChange() {
        this.setState({
            password: ReactDOM.findDOMNode(this.refs.form.refs.password).value,
            verify_password: ReactDOM.findDOMNode(this.refs.form.refs.verify_password).value
        })
    },
    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        if (this.state.password !== this.state.verify_password) {
            return self.setState({
                message: "Passwords don't match"
            })

        }

        Axios.post('/auth/password/reset', {
            code: this.props.params.code,
            userId: this.props.params.userId,
            password: this.state.password
        }).then(function (result) {
            if (result.data.success) {
                self.setState({
                    submitted: true
                })
            }
        }).catch(function (error) {
            console.log(error);
        })

    },
    render: function () {
        return (
            <div>
                <h1 className="text-center" style={{marginBottom:30}}>Reset Password</h1>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                    { this.state.submitted ? <Submitted /> :
                        <Form ref="form" handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>}
                </div>
                {this.state.message ? <Alert message={this.state.message}/> : null}
            </div>
        );
    }

});

const Submitted = () => (
    <div style={{paddingBottom:20}}>
        <p>Your password was reset successfully</p>
        <div className="center-block">
            <a href="/login">
                <button className="btn btn-primary full-width-btn">Return to sign in</button>
            </a>
        </div>
    </div>
);

var Form = React.createClass({
    render: function () {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <p>Enter a new password below</p>
                <div className="form-group">
                    <label htmlFor="password_input">Password</label>
                    <input ref="password" id="password_input" type="password"
                           className="form-control" onChange={this.props.handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="verify_password_input">Verify Password</label>
                    <input id="verify_password_input" ref="verify_password" type="password"
                           className="form-control" onChange={this.props.handleChange} required/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
                </div>
            </form>
        )
    }

});


const Alert = (props) => (
    <div style={{marginTop:20}} className="alert alert-danger col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <h5 className="text-center">{props.message}</h5>
    </div>
)

module.exports = PasswordReset