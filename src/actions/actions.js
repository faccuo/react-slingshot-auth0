import * as types from '../constants/actionTypes';
import auth0 from '../businessLogic/auth0';
import { browserHistory } from 'react-router';

export function logInIfNeeded() {
  return dispatch => {
    if (auth0().isLoggedIn()) {
      dispatch({
        type: types.LOGGED_IN
      });
      browserHistory.replace('/');
    } else {
      dispatch({
        type: types.LOGIN
      });
      auth0().triggerLogin();
    }
  };
}

export function logout() {
  return dispatch => {
    dispatch({
      type: types.LOGOUT
    });

    auth0().logout();
  };
}

export function sendUserData(userData) {
  return dispatch => {
    dispatch({
      type: types.POST_DATA,
      userData: userData
    });

    
  };
}
