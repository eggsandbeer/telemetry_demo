var BASE_URL = window.location.origin + '/';

export default {
  BASE_URL: BASE_URL,
  GA_KEY: 'ga:clientId',
  IMAGE_DEFAULTS: '?resize=900:*&output-format=jpeg&output-quality=100',

  // ERROR STORE
  NEW_ERROR: 'NEW_ERROR',
  ERROR_DESTROY: 'ERROR_DESTROY',
  ERROR_DISPLAY_TIMEOUT: 7000,

  // LOGIN STORE
  LOGIN_URL: BASE_URL + 'users/login',
  LOGIN_USER: 'LOGIN_USER',
  LOGIN_INVALIDATE: 'LOGIN_INVALIDATE',
  AUTH_KEY: 'login_data'
}
