import { POST_DATA, POST_DATA_SAVED, POST_DATA_FAILURE, LOGOUT, UNAUTHENTICATED_REQUEST } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function userData(state = initialState.userData, action) {
  switch (action.type) {
    case UNAUTHENTICATED_REQUEST:
    case LOGOUT:
      return objectAssign({}, initialState.userData);
    case POST_DATA:
      return objectAssign({}, state, {
        isFetching: true,
        finished: false,
        data: action.userData
      });
    case POST_DATA_SAVED:
    case POST_DATA_FAILURE:
      return objectAssign({}, state, {
        isFetching: false,
        finished: true,
        message: action.message
      });
    default:
      return state;
  }
}
