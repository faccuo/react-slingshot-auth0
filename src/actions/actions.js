import * as types from '../constants/actionTypes';
import auth0 from '../businessLogic/auth0';
import api from '../businessLogic/api';
import { browserHistory } from 'react-router';

export function logInIfNeeded() {
  return dispatch => {
    if (auth0.isLoggedIn()) {
      dispatch({
        type: types.LOGGED_IN
      });
      browserHistory.replace('/');
    } else {
      dispatch({
        type: types.LOGIN
      });
      auth0.triggerLogin();
    }
  };
}

export function logout() {
  return dispatch => {
    auth0.logout();

    dispatch({
      type: types.LOGOUT
    });
  };
}

export function sendUserData(userData) {
  return dispatch => {
    dispatch({
      type: types.POST_DATA,
      userData: userData
    });

    api.send(userData).then(function (data) {
      dispatch({
        type: types.POST_DATA_SAVED,
        message: "Data sent."
      });
    }).catch(function (error) {
      dispatch({
        type: types.POST_DATA_FAILURE,
        error: error,
        message: "Error sending data."
      });
    });
  };
}
