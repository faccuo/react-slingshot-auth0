import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

import LoggedIn from './LoggedIn';
import Auth0Lock from './Auth0Lock';

// This export for tests: { App }
// http://redux.js.org/docs/recipes/WritingTests.html
export class App extends Component {

  render() {
    const { isLoggedIn, message } = this.props;

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
            open={message != null}
            message={message}
            autoHideDuration={4000}/>
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  message: PropTypes.string
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    message: state.message
  };
}

export default connect(mapStateToProps)(App);
