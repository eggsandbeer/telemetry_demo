import React from 'react';
import ErrorStore from '../stores/ErrorStore.js';
import Alert from 'react-bootstrap/lib/Alert.js';
import ErrorActions from '../actions/ErrorActions.js';
import { ERROR_DISPLAY_TIMEOUT } from '../constants/Constants.js';
import BaseStyles from './base/base_styles.js'

class Error extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      errorMessage: ErrorStore.errorMessage
    }
    this.changeListener = this.onChange.bind(this);
  }

  shouldRender() {
    return !!this.state.errorMessage
  }

  componentWillMount() {
    ErrorStore.addChangeListener(this.changeListener)
  }

  componentWillUnmount() {
    ErrorStore.removeChangeListener(this.changeListener)
  }

  onChange() {
    this.setState({
      'errorMessage': ErrorStore.errorMessage
    })
  }

  render() {
    if (this.shouldRender()) {
      setTimeout(function() { ErrorActions.hideError(); }, ERROR_DISPLAY_TIMEOUT);

      return (
        <Alert bsStyle="danger" style={BaseStyles.positionAlert} >
          <strong>Error!</strong> {this.state.errorMessage}
        </Alert>
      )
    }

    return null
  }
}

module.exports = Error;
