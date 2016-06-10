import * as types from '../constants/actionTypes';
import auth0 from '../businessLogic/auth0';
import api from '../businessLogic/api';
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
    auth0().logout();

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

    api().send(userData)
      .then(function (response) {
        const validStatus = response.status >= 200 && response.status < 300;

        if (validStatus) {
          dispatch({
            type: types.POST_DATA_SAVED,
            message: "Data sent."
          });
        } else if (response.status == 401) {
          auth0().logout();
          dispatch({
            type: types.UNAUTHENTICATED_REQUEST
          });
        } else {
          dispatch({
            type: types.POST_DATA_FAILURE,
            message: "Error sending data. Try again."
          });
        }
      })
  };
}
