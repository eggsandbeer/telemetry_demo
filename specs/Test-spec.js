var Login = require('./../client/javascript/components/Login.jsx');
var Error = require('./../client/javascript/components/Error.jsx');
var React = require("react");
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Auth = './../client/javascript/services/AuthService';
import { AUTH_KEY } from './../client/javascript/constants/Constants';
import { history } from 'react-router/lib/BrowserHistory';

describe("LoginStore and LoginActions", function(){

  var LoginActions;
  var LoginStore;

  beforeEach(() => {
    jasmine.clock().install(); // Mock out the built in timers
    LoginActions = require('./../client/javascript/actions/LoginActions.js');
    LoginStore = require('./../client/javascript/stores/LoginStore.js');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("should return no user before a login attempt is made or if there is a local storage set available, it will return true", function(){

    var localData = JSON.parse(localStorage.getItem(AUTH_KEY));
    var loggedIn = LoginStore.isLoggedIn();

    if(localData){
      expect(loggedIn).toBe(true);
    } else {
      expect(loggedIn).toBe(false);
    }
  });


  it("should handle setting the store when logging in a user.", function () {

    LoginActions.loginUser({
      authToken: 609238409832,
      user: 'Cameron'
    });
    jasmine.clock().tick(); // Advance the clock to the next tick

    var loggedIn = LoginStore.isLoggedIn()

    expect(loggedIn).toBe(true);
  });

});

describe("MainContainer Component", function() {
  var MainContainer = require('./../client/javascript/components/MainContainer.jsx');
  var LoginActions = require('./../client/javascript/actions/LoginActions.js');
  var mainContainer;

  afterEach(function(){
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(mainContainer).parentNode);
    LoginActions.invalidateUser();
  });

  it('should have an active logged in state if the LoginStore returns true (which this test will cause).', function() {
    mainContainer = TestUtils.renderIntoDocument(
      <MainContainer/>
    );

    var mainContainerNode = ReactDOM.findDOMNode(mainContainer);

    expect(mainContainer.state.loggedIn).toBe(true);
  });

  it('should have an false logged in state if the LoginStore returns false (which this test will cause).', function() {
    mainContainer = TestUtils.renderIntoDocument(
      <MainContainer/>
    );

    var mainContainerNode = ReactDOM.findDOMNode(mainContainer);

    expect(mainContainer.state.loggedIn).toBe(false);
  });
});

describe("Login Component", function() {

  var login;

  beforeEach(() => {
    login = TestUtils.renderIntoDocument(
      <Login/>
    );
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should update the username state when the username input is changed', function() {
    login.refs.username_input.value = 'cameron.strandberg@gmail.com';
    TestUtils.Simulate.change(login.refs.username_input);
    expect(login.state.email).toBe('cameron.strandberg@gmail.com');
  });

  it('should update the password state when the password input is changed', function() {
    login.refs.password_input.value = 'password';
    TestUtils.Simulate.change(login.refs.password_input);
    expect(login.state.password).toBe('password');
  });


  describe('login process', function(){
    var ErrorActions = require('./../client/javascript/actions/ErrorActions.js');

    var error, errorNode;

    beforeEach(function(){
      login.refs.username_input.value = 'cameron.strandberg@gmail.com';
      TestUtils.Simulate.change(login.refs.username_input);
    });

    it('should throw and display an error when logging in with the password `password`', function(){

      login.refs.password_input.value = 'password';

      TestUtils.Simulate.change(login.refs.password_input);

      TestUtils.Simulate.click(login.refs.login_button);

      error = TestUtils.renderIntoDocument(
        <Error/>
      )

      errorNode = ReactDOM.findDOMNode(error);

      expect(TestUtils.isDOMComponent(errorNode)).toBe(true);
      ErrorActions.hideError();
    });

    it('should NOT throw and display an error when logging in with a password that is NOT `password`', function(){
      login.refs.password_input.value = 'no_password';
      TestUtils.Simulate.change(login.refs.password_input);
      TestUtils.Simulate.click(login.refs.login_button);

      error = TestUtils.renderIntoDocument(
        <Error />
      )

      errorNode = ReactDOM.findDOMNode(error);

      expect(TestUtils.isDOMComponent(errorNode)).toBe(false);
    });
  });
});
