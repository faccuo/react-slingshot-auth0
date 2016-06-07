import { POST_DATA, POST_DATA_SAVED, POST_DATA_FAILURE } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function userData(state = initialState.userData, action) {
  switch (action.type) {
    case POST_DATA:
      return objectAssign({}, state, {
        isSending: true,
        data: action.userData
      });
    case POST_DATA_SAVED:
      return objectAssign({}, state, {
        isSending: false,
        saved: true
      });
    case POST_DATA_FAILURE:
      return objectAssign({}, state, {
        isSending: false,
        saved: false,
        error: action.error.message
      });
    default:
      return state;
  }
}
