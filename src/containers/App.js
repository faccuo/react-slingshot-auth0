import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

import LoggedIn from './LoggedIn';
import Auth0Lock from './Auth0Lock';

class App extends Component {

  render() {
    const { isLoggedIn, finished, message } = this.props;

    return (
      <div>
        {
          isLoggedIn &&
          <LoggedIn/>
        }
        {
          !isLoggedIn &&
          <Auth0Lock/>
        }

        <Paper>
          <Snackbar
            open={finished}
            message={message}
            autoHideDuration={4000}/>
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    finished: state.userData.finished,
    message: state.userData.message || ''
  };
}

export default connect(mapStateToProps)(App);
