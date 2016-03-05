import { LOGIN_URL } from '../constants/Constants';
import LoginActions from '../actions/LoginActions';
import ErrorActions from '../actions/ErrorActions';
import RequestService from './RequestService.js';

class AuthService {

  login(email, password) {
    var data = {
      email: email,
      password: password
    };

    if (data.password === 'password') {
      ErrorActions.showError('"password" is not an acceptable password. Please come up with something more complex.');
    } else {
      var requestOptions = {
        url: LOGIN_URL,
        method: 'POST',
        body: data
      };

      RequestService.gatedRequest(requestOptions, function(response) {
        let userData = {
          authToken : response.authToken,
          user: response.user
        };
        LoginActions.loginUser(userData);
      });
    }
  }
}

export default new AuthService();
