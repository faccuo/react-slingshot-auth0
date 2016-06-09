import { LOGGED_IN, LOGIN, LOGOUT, UNAUTHENTICATED_REQUEST } from '../constants/actionTypes';
import initialState from './initialState';

export default function auth(state = initialState.isLoggedIn, action) {
  switch (action.type) {
    case UNAUTHENTICATED_REQUEST:
    case LOGIN:
    case LOGOUT:
      return false;
    case LOGGED_IN:
      return true;
    default:
      return state;
  }
}
