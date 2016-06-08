import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import { logInIfNeeded } from '../actions/actions';

class Auth0Lock extends Component {

  componentDidMount() {
    this.props.dispatch(logInIfNeeded());
  }

  render() {
    return (<div></div>);
  }
}

Auth0Lock.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Auth0Lock);
