import { LOGIN_URL } from '../constants/Constants';
import LoginActions from '../actions/LoginActions';
import RequestService from './RequestService.js';

class AuthService {

  login(email, password) {
    const data = {
      email: email,
      password: password
    };

    let requestOptions = {
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

export default new AuthService();
