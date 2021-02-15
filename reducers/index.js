import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';
import { parcelReducer } from './parcelReducer';
import { userReducer } from './userReducer';
import { qrReducer } from './qrReducer';
export default combineReducers({
  // authenticationReducer,
  parcelReducer,
  userReducer,
  qrReducer,
});
