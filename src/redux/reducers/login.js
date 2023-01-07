import { Map } from 'immutable';

import { createReducer } from '../../utils';
import { ActionTypes } from '../../constants/actions';

const initialLoginState = Map({
  isUserLogingIn: false,
  isUserLoggedIn: false,
  errorMessage: {},
  isErrorInLoading: false,
  isAccountLocked: false,
});

const initialFetchState = Map({
  isConfigurationLoading: false,
  isErrorLoadingConfiguration: false,
  errorLoadingConfiguration: '',
  configuration: [],
  IsFirstTimeUserLogin: null,
  IsAccessCardAvailable: null,
  isQuickPayLoading: false,
  errorLoadingQuickPay: '',
  isErrorLoadingQuickPay: false,
});

const initialState = initialLoginState.merge(initialFetchState);

export default {
  login: createReducer(initialState, {
    [ActionTypes.SET_INITIATE_LOGIN]: (state, action) =>
      state.withMutations(stateMap => {
        stateMap.set('isUserLoggedIn', true);
        stateMap.set('isUserLogingIn', false);
        stateMap.set('isErrorInLoading', false);
        stateMap.set('errorMessage', {});
      }),
    [ActionTypes.START_INITIATE_LOGIN]: (state, action) =>
      state.withMutations(stateMap => {
        stateMap.set('isAccountLocked', false);
        stateMap.set('isUserLoggedIn', false);
        stateMap.set('isUserLogingIn', true);
        stateMap.set('errorMessage', {});
        stateMap.set('isErrorInLoading', false);
      }),
    [ActionTypes.ERROR_INITIATE_LOGIN]: (state, action) => {
      const { error } = action;
      const { message = '', header = '' } = error;
      return state.withMutations(stateMap => {
        stateMap.set('errorMessage', { message, header });
        stateMap.set('isErrorInLoading', true);
        stateMap.set('isUserLogingIn', false);
      });
    },
  
    [ActionTypes.LOGOUT_USER_LOGIN]: (state, action) =>
      state.withMutations(stateMap => {
        stateMap.set('isUserLoggedIn', false);
        stateMap.set('isUserLogingIn', false);
        stateMap.set('errorMessage', {});
        stateMap.set('isErrorInLoading', false);
      }),
   
   
   
    
  }),
};
