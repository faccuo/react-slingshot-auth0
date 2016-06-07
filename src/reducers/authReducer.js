import { LOGGED_IN, LOGIN, LOGOUT } from '../constants/actionTypes';
import initialState from './initialState';

export default function auth(state = initialState.isLoggedIn, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return false;
    case LOGGED_IN:
      return true;
    default:
      return state;
  }
}
