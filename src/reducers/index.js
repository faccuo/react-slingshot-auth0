import { combineReducers } from 'redux';
import auth from './authReducer';
import userData from './userDataReducer';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default combineReducers({
  isLoggedIn: auth,
  userData
});
