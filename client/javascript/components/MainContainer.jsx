import React from 'react';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import baseStyles from './base/base_styles.js';

import Login from './Login.jsx';
import Error from './Error.jsx';

class MainContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: LoginStore.isLoggedIn()
    }
    this.changeListener = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.addChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      loggedIn: LoginStore.isLoggedIn()
    });

    if (this.state.loggedIn) {
      this.props.history.pushState(null, `/loggedIn`);
    }
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container" style={baseStyles.main}>
        <Error />
        {this.props.children}
      </div>
    );
  }
};

module.exports = MainContainer;
