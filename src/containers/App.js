import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { logInIfNeeded, logout  } from '../actions/actions';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(logInIfNeeded());
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
          <button onClick={this.logout.bind(this)}>Log out</button>
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
  dispatch: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.boolean
};

export default connect(mapStateToProps)(App);
