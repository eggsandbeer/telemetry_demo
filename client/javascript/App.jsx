import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import {Style, StyleRoot} from 'radium';
import { Router } from 'react-router';
import { Route } from 'react-router';
import { Link } from 'react-router';
import { IndexRoute } from 'react-router';
import { hashHistory } from 'react-router';

import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx';

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
    replaceWith(null, '/loggedIn');
  }
}

var requireAuth = (nextState, replace) => {
  let isLoggedIn = LoginStore.isLoggedIn();
  if (!isLoggedIn) {
    replace({ nextPathname: nextState.location.pathname }, '/login');
  }
}


ReactDOM.render(
  <StyleRoot>

    <Router history={hashHistory}>
      <Route path="/" component={MainContainer}>
        <IndexRoute onEnter={redirectToChild} />
        <Route path="login" component={Login} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </StyleRoot>, document.getElementById('MainContainer')
)
