import { createSelector } from 'reselect';
import { initialState } from '../reducers/signup';
import REDUCER_KEY from '../../redux/reducersKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.FORGOT_PASSWORD_REDUCER] || initialState;

const getForgotDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isForgotPassword;
});

export {
    getForgotDataSelector, 
};
