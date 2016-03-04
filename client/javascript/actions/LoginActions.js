import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { LOGIN_USER, LOGIN_INVALIDATE } from '../constants/Constants.js';

export default {
  loginUser: (data) => {
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      data: data
    });
  },

  invalidateUser: () => {
    AppDispatcher.dispatch({
      actionType: LOGIN_INVALIDATE,
    });
  }
}
