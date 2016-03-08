import React from 'react';
import Radium, {Style, StyleRoot} from 'radium';
import Auth from '../services/AuthService';
import ErrorActions from '../actions/ErrorActions';

import BaseStyles from './base/base_styles.js'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      email_error: false,
      password_error: false
    };
  }

  login(e) {
    e.preventDefault();

    this.render()
    if(this.state.email.length < 8) {
      ErrorActions.showError('Your username should be longer than 8 characters long.');
      this.setState({
        email_error: true
      });
    } else if (this.state.password.length < 8){
      ErrorActions.showError('Your password should be longer than 8 characters long.');
      this.setState({
        password_error: true
      });

    } else if (this.state.password = 'password') {
      ErrorActions.showError('"password" is not an acceptable password. Please come up with something more complex.');
      this.setState({
        password_error: true
      });

    } else {
      Auth.login(this.state.email, this.state.password);
    }
  }

  handleEmailChange(e) {
    this.setState({
      email_error: false,
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password_error: false,
      password: e.target.value
    });
  }

  render() {

    var styles = {
      containerWrapper: {
        display: 'table-cell',
        verticalAlign: 'middle',
      },
      loginContainer: {
        padding: '20px',
        borderRadius: '4px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#2D2D2D',
        zIndex: 1,
        position: 'relative',
        maxWidth: '400px',
        '@media (maxWidth: 768px)': {
          maxWidth: 'none',
          width: '100%'
        }
      },
      login_button: {
        maxWidth: '200px',
        margin: '0 auto 40px auto',
        display: 'block'
      },
      header: {
        textAlign: 'center',
        marginBottom: '30px'
      },
      logo: {
        width: '200px'
      },
      inputs: {
        padding: '20px 15px',
        fontSize: '1.1em'
      },
      spacer: {
        marginBottom: '20px'
      }
    }

    var password_error_style;
    if (this.state.password_error) {
      var password_error_style = BaseStyles.inputError;
    }

    var email_error_style;
    if (this.state.email_error) {
      var email_error_style = BaseStyles.inputError;
    }

    return (
      <div style={styles.containerWrapper}>
        <Style
           rules={{
               '.loginContainer': {
                 padding: '20px',
                 borderRadius: '4px',
                 marginLeft: 'auto',
                 marginRight: 'auto',
                 backgroundColor: '#2D2D2D',
                 position: 'relative',
                 maxWidth: '400px',
               },
               mediaQueries: {
                 '(max-width: 768px)': {
                   '.loginContainer': {
                     maxWidth: 'none',
                     width: '100%'
                   }
                 }
               }
           }}
         />

       <div className="loginContainer">
          <div className="row">
            <div style={styles.header}>
              <img style={styles.logo} alt="Telemtry Logo" src="./images/logo-full-medium.png" />
            </div>
          </div>
          <div className="row" style={styles.spacer}>
            <div className="col-sm-offset-2 col-sm-8">
              <input
                type="text"
                onChange={this.handleEmailChange.bind(this)}
                className="form-control"
                id="email"
                placeholder="Username"
                ref="username_input"
                style={[styles.inputs, email_error_style]}
              />
            </div>
          </div>
          <div className="row" style={styles.spacer}>
            <div className="col-sm-offset-2 col-sm-8">
              <input
                type="password"
                onChange={this.handlePasswordChange.bind(this)}
                className="form-control"
                id="password"
                ref="password_input"
                placeholder="Password"
                style={[styles.inputs, password_error_style]}
              />
            </div>
          </div>
          <button
            type="submit"
            style={[BaseStyles.blueActionButton, styles.login_button]}
            onClick={this.login.bind(this)}
            ref="login_button"
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
}

module.exports = Radium(Login);
