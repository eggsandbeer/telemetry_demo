import React from 'react';
import ReactDOM from 'react-dom';
import {Style, StyleRoot} from 'radium';
import ReactRouter, { Router, Route, Link, IndexRoute,hashHistory } from 'react-router';


import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx';
import LoggedIn from './components/LoggedIn.jsx';

import LoginActions from './actions/LoginActions';
import LoginStore from './stores/LoginStore';

class NoMatch extends React.Component {
  render() {
    return (
      <div>
        NOMATCH
      </div>
    )
  }
}

var redirectToChild = (location, replaceWith) => {
  let isLoggedIn = LoginStore.isLoggedIn();

  if (!isLoggedIn) {
    replaceWith(null, '/login');
  } else {
    replaceWith(null, '/loggedin');
  }
}

var requireAuth = (nextState, replace) => {
  let isLoggedIn = LoginStore.isLoggedIn();
  if (!isLoggedIn) {
    replace('/login');
  }
}


ReactDOM.render(
  <StyleRoot>
    <Router history={hashHistory}>
      <Route path="/" component={MainContainer}>
        <IndexRoute onEnter={redirectToChild} />
        <Route path="login" component={Login} />
        <Route path="loggedin" component={LoggedIn} onEnter={requireAuth} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </StyleRoot>, document.getElementById('MainContainer')
)
