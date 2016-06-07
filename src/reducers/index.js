import { combineReducers } from 'redux'
import auth from './authReducer';
import userData from './userDataReducer'

export default combineReducers({
  isLoggedIn: auth,
  userData
});
