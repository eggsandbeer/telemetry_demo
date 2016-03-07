var Login = require('./../client/javascript/components/Login.jsx');
var MainContainer = require('./../client/javascript/components/MainContainer.jsx');
var React = require("react");
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils')

describe("LoginStore and LoginActions", function(){

  describe("LoginStore", function () {
      var MemberActions;
      var MemberStore;

      beforeEach(() => {
        jasmine.clock().install(); // Mock out the built in timers
        MemberActions = require('./../client/javascript/actions/LoginActions.js');
        MemberStore = require('./../client/javascript/stores/LoginStore.js');
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });


    it("handle logging in a user.", function () {

      MemberActions.loginUser({
        authToken: 609238409832,
        user: 'Cameron'
      });
      jasmine.clock().tick(); // Advance the clock to the next tick

      var loggedIn = MemberStore.isLoggedIn()

      expect(loggedIn).toBe(true);
    });
  });
});

describe("Login", function() {

  it('changes the text after click', function() {

    var login = TestUtils.renderIntoDocument(
      <Login/>
    );

    var loginNode = ReactDOM.findDOMNode(login);

    // console.log(loginNode);

    // Verify that it's Off by default
    expect(loginNode.error).toEqual(undefined);

    // Simulate a click and verify that it is now On
    // TestUtils.Simulate.change(
    //   TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    // );
    // expect(checkboxNode.textContent).toEqual('On');
  });

  it('changes the text after click', function() {

    console.log(TestUtils)

    var mainContainer = TestUtils.renderIntoDocument(
      <MainContainer/>
    );

    var mainContainerNode = ReactDOM.findDOMNode(mainContainer);

    // console.log(loginNode);

    // Verify that it's Off by default
    expect(mainContainerNode.error).toEqual(undefined);

    // Simulate a click and verify that it is now On
    // TestUtils.Simulate.change(
    //   TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    // );
    // expect(checkboxNode.textContent).toEqual('On');
  });



});
