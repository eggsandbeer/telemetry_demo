import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {NEW_ERROR, ERROR_DESTROY} from '../constants/Constants.js';

export default {
  showError: (data) =>
    AppDispatcher.dispatch({
      errorMessage: data,
      actionType: NEW_ERROR
    }),

  hideError: () =>
    AppDispatcher.dispatch({
      actionType: ERROR_DESTROY
    })
}
