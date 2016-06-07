import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { logInIfNeeded, logout  } from '../actions/actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

import FormPage from '../components/FormPage';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(logInIfNeeded());
  }

  send(data) {
    // TODO
  }

  logout() {
    const { dispatch } = this.props;

    dispatch(logout());
    dispatch(logInIfNeeded());
  }

  render() {

    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <div>
          <AppBar
            title="User data"
            iconElementRight={<IconButton onClick={this.logout.bind(this)}><ExitToApp/></IconButton>}
            iconElementLeft={<div></div>}
          />
          <FormPage onSubmit={this.send.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }

  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(App);
