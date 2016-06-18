/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:23
 */
var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var AdvertiserDashbord = require('../components/Advertiser/Dashboard');
var Signup = require('../components/Auth/Signup');
var Login = require('../components/Auth/Login');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
    <Route path="/" component={Main}>
        <Route path="advertiser" component={AdvertiserDashbord} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
      <IndexRoute component={Home} />

    </Route>
);