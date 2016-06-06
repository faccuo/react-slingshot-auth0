import { LOGGED_IN, LOGIN, LOGOUT } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return objectAssign({}, state, {
        isLoggedIn: false
      });
    case LOGGED_IN:
      return objectAssign({}, state, {
        isLoggedIn: true
      });
    default:
      return state;
  }
}
