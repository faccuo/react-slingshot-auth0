import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import LoggedIn from './LoggedIn';
import Auth0Lock from './Auth0Lock';

class App extends Component {

  render() {
    const { isLoggedIn } = this.props;

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
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {isLoggedIn: state.isLoggedIn};
}

export default connect(mapStateToProps)(App);
