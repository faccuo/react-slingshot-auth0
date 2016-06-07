import { POST_DATA } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function userData(state = initialState.userData, action) {
  switch (action.type) {
    case POST_DATA:
      return objectAssign({}, state, {
        isSending: true,
        data: action.userData
      });
    default:
      return state;
  }
}
