import { createSelector } from 'reselect';
import { initialState } from '../reducers/signup';
import REDUCER_KEY from '../../redux/reducersKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.SIGNUP] || initialState;

const getSignupUserSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.user;
});
const getIdLoginUserSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isLoggedIn;
});

const getSecurityQuestionDoneSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.isSecurityQuestionDone;
});



export {
    getSignupUserSelector,
    getIdLoginUserSelector,
    getSecurityQuestionDoneSelector
};
