/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:22
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes');
require('../scss/main.scss');
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();



const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={browserHistory}>{routes}</Router>
    </MuiThemeProvider>
);



ReactDOM.render(<App />, document.getElementById('app'))