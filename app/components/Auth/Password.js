/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 12:29
 */
const React = require('react');
const Axios = require('axios');


var Password = React.createClass({
    getInitialState(){
        return {
            code: '',
            message: '',
            email: '',
            submitted: false
        }
    },
    handleChange: function (event) {
        this.setState({email: event.target.value});
    },
    handleSubmit(e){
        e.preventDefault();

        Axios.post('/auth/password',
            {email: this.state.email})
            .then((result)=> {
                console.log(result);
                if (result.data.success) {
                    this.setState({submitted: true});
                } else {
                    this.setState({message: result.data.message})
                }
            }).catch((error)=> {
            this.setState({message: error})
        });

    },
    render: function () {
        return (
            <div>
                <h1 className="text-center" style={{marginBottom:30}}>Reset Password</h1>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                    { this.state.submitted ? <Submitted /> :
                        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> }
                </div>
                {this.state.message ? <Alert message={this.state.message}/> : null}
            </div>
        );
    }
});

const Submitted = () => (
    <div style={{paddingBottom:20}}>
        <p>Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your
            spam folder.</p>
        <div className="center-block">
            <a href="/login">
                <button className="btn btn-primary full-width-btn">Return to sign in</button>
            </a>
        </div>
    </div>
);

const Form = (props) => (
    <form onSubmit={props.handleSubmit}>
        <div className="form-group">
            <p>Enter your email address and we will send you a link to reset your password.</p>
            <label className="hidden" htmlFor="email_input">Email</label>
            <input onChange={props.handleChange} id="email_input" type="email" className="form-control"
                   placeholder="Enter your email" required/>
        </div>
        <div className="form-group">
            <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
        </div>
    </form>
);

const Alert = (props) => (
    <div style={{marginTop:20}} className="alert alert-danger col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <h5 className="text-center">{props.message}</h5>
    </div>
)


module.exports = Password;