import { createSelector } from 'reselect';
import { initialState } from '../reducers/signup';
import REDUCER_KEY from '../../redux/reducersKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.PROFILE_REDUCER] || initialState;

const getUserLoginDataSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.userData;
});


export {
    getUserLoginDataSelector,
};
