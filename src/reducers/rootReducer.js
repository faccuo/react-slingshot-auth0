import * as types from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.UNAUTHENTICATED_REQUEST:
    case types.LOGIN:
    case types.LOGOUT:
      return objectAssign({}, initialState);
    case types.LOGGED_IN:
      return objectAssign({}, state, {
        isLoggedIn: true
      });
    case types.POST_DATA:
      return objectAssign({}, state, {
        isFetching: true,
        data: action.userData
      });
    case types.POST_DATA_SAVED:
    case types.POST_DATA_FAILURE:
      return objectAssign({}, state, {
        isFetching: false,
        message: action.message,
        data: {}
      });
    default:
      return state;
  }
}
