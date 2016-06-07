import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import FormPage from '../components/FormPage';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

import { logout, sendUserData  } from '../actions/actions';

class LoggedIn extends Component {

  logout() {
    this.props.dispatch(logout());
  }

  send(data) {
    this.props.dispatch(sendUserData(data));
  }

  render() {
    const { isSending } = this.props;

    return (<div>
      <AppBar
        title="User data"
        iconElementRight={<IconButton onClick={this.logout.bind(this)}><ExitToApp/></IconButton>}
        iconElementLeft={<div></div>}
      />
      {
        isSending &&
        <div>Loading...</div>
      }
      {
        !isSending &&
        <FormPage onSubmit={this.send.bind(this)}/>
      }
    </div>);
  }

}

LoggedIn.propTypes = {
  isSending: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {isSending: state.userData.isSending};
}

export default connect(mapStateToProps)(LoggedIn);
