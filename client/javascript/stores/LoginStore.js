import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { LOGIN_USER, LOGIN_INVALIDATE, AUTH_KEY } from '../constants/Constants';

var _user = null;
var _authToken = null;

class LoginStore extends EventEmitter {

  constructor(props) {
    super(props);
    AppDispatcher.register(this._registerToActions.bind(this));

    var savedLoginData = localStorage.getItem('login_data');
    if (savedLoginData){
      var parsed = JSON.parse(savedLoginData);
      _user = parsed.user;
      _authToken = parsed.authToken;
    }
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        _authToken = action.data.authToken;
        _user = action.data.user;
        localStorage.setItem(AUTH_KEY, JSON.stringify(action.data));
        this.emitChange();
        break;

      case LOGIN_INVALIDATE:
        _authToken = null;
        _user = null;
        localStorage.removeItem(AUTH_KEY)
        this.emitChange();
        break;
    };
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  emitChange() {
    this.emit('CHANGE');
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }

  get user() {
    return _user;
  }

  get authToken() {
    return _authToken;
  }

  isLoggedIn() {
    return _user && _authToken;
  }
}

export default new LoginStore();
