var request = require('bluebird').promisify(require('request'));
import { AUTH_KEY } from '../constants/Constants';
import LoginActions from '../actions/LoginActions';
import ErrorActions from '../actions/ErrorActions';

class RequestService {

  gatedRequest(requestOptions, callback) {
    // Add Authentication, Content-Type Headers
    var localData = JSON.parse(localStorage.getItem(AUTH_KEY));
    var xToken = (localData && localData.authToken) ? localData.authToken : "";

    var defaultOpts =  {
      headers: { 'x-authentication-token': xToken },
      crossOrigin: false,
      json: true
    }

    Object.assign(requestOptions, defaultOpts);

    request(requestOptions)
      .then(function(data) {
        let response = data[1];
        if (clientError(response)) {
          if (response.error) {
            ErrorActions.showError(response.error);
          }
          if (response.code == 401) {
            LoginActions.invalidateUser();
          }
        } else {
          callback(response);
        }
      });
  }
}

function clientError(e) {
  return e.code >= 400 && e.code < 500;
}

let instance = new RequestService();

export default instance;
