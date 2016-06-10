import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import FormPage from '../components/FormPage';
import Loading from '../components/Loading';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Paper from 'material-ui/Paper';

import { logout, sendUserData  } from '../actions/actions';

export class LoggedIn extends Component {

  logout() {
    this.props.dispatch(logout());
  }

  send(data) {
    this.props.dispatch(sendUserData(data));
  }

  render() {
    const { isFetching } = this.props;
    const logo = require('../images/auth0-logo-light.png');

    return (<div className="container">
      <AppBar
        iconElementRight={<IconButton onClick={this.logout.bind(this)}><ExitToApp/></IconButton>}
        iconElementLeft={<img src={logo} style={{ height: 47 }}></img>}
      />
      <Paper>
        {
          isFetching &&
          <Loading/>
        }
        {
          !isFetching &&
          <FormPage onSubmit={this.send.bind(this)}/>
        }
      </Paper>
    </div>);
  }

}

LoggedIn.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isFetching: state.isFetching
  };
}

export default connect(mapStateToProps)(LoggedIn);
