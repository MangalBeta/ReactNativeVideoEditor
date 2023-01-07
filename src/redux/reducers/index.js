import { combineReducers } from 'redux';

import REDUCER_KEY from '../reducersKeys';
import AppReducer from '../../appContainer/reducer';

import signup from './signup';
import verification from './verification';
import profile from './profile';
import forgotPassword from './forgotPassword';


export default () => combineReducers({
  [REDUCER_KEY.APP_REDUCER]: AppReducer,
  [REDUCER_KEY.SIGNUP] : signup,
  [REDUCER_KEY.VERIFICATION_REDUCER] : verification,
  [REDUCER_KEY.PROFILE_REDUCER] : profile,
  [REDUCER_KEY.FORGOT_PASSWORD_REDUCER] : forgotPassword,

})