import { createSelector } from 'reselect';
import { initialState } from '../reducers/signup';
import REDUCER_KEY from '../../redux/reducersKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.VERIFICATION_REDUCER] || initialState;

const getVerificationserSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.user;
});

const getVerificationsIsVerifiedSelector = createSelector(selectGlobalSubStore, (globalState) => {
    return globalState.isVerified;
  });

export {
    getVerificationsIsVerifiedSelector,
    getVerificationserSelector
};
