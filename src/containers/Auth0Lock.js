import React, { Component } from 'react';
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

export default connect()(Auth0Lock);
