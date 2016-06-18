/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 15/06/2016
 * Time: 10:27
 */
import React from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

const avatarStyle = {
    marginTop: '10px'
};

const navbarInstance = React.createClass({

    getInitialState: function () {
      return {
          user: {}
      }
    },
    componentDidMount(){
        this.init(this.props.user);
    },
    componentWillReceiveProps: function(nextProps){
        this.init(nextProps.user)
    },
    init: function (user) {
        this.setState({
            user: user
        })
    },

    render: function () {
        return (
            <Navbar className="main-nav">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Filicode </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Products</NavItem>
                        <NavItem eventKey={2} href="#">Publishers</NavItem>
                        <NavItem eventKey={3} href="#">Reports</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <Avatar className="pull-left" size={30} style={avatarStyle}
                                icon={ <FontIcon className="material-icons avatar-icon">account_circle</FontIcon>}/>
                        { this.state.user.id ? <DropDown /> : <Login /> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

});

const Login = () => (
    <NavItem eventKey={1} href="/login">Signin</NavItem>
);

var DropDown = React.createClass({
    render: function () {
        return (
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Profile</MenuItem>
                <MenuItem eventKey={3.2}>Invite friends</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={3.3} href="/auth/logout">Log out</MenuItem>
            </NavDropdown>

        );
    }
});


export default navbarInstance;