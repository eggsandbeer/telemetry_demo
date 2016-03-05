import React from 'react';

class LoggedIn extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p> You are now logged in to the app. Your login name and 'Auth Token' have been stored in localstorage under the key 'login_data'. If you delete that record, you will lose the ability to see this page. Don't worry though, you can just log in again. Just don't use the 'password' password :) </p>
      </div>
    );
  }
}

module.exports = LoggedIn;
