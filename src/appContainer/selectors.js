import { createSelector } from 'reselect';
import {Platform} from 'react-native';
import { initialState } from './reducer';
import REDUCER_KEY from '../redux/reducersKeys';

const selectGlobalSubStore = (store) => store[REDUCER_KEY.APP_REDUCER] || initialState;

const globalStateSelector = createSelector(selectGlobalSubStore, (subState) => subState);

const isLoggedInSelector = createSelector(selectGlobalSubStore, (globalState) => globalState.isLoggedIn);
const userSelector = createSelector(selectGlobalSubStore, (globalState) => globalState.user);
const tokenSelector = createSelector(selectGlobalSubStore, (globalState) => globalState.token);

const isRouteChangingSelector = createSelector(selectGlobalSubStore, (globalState) => globalState.routeChanging);
const isLoadingSelector = createSelector(selectGlobalSubStore, (globalState) => globalState.isLoading);

const selectGlobalError = createSelector(selectGlobalSubStore, (globalState) => globalState.error);
const selectIsGlobalError = createSelector(selectGlobalSubStore, (globalState) => globalState.isError);

const selectIsSubscribeModalOpen = createSelector(
  selectGlobalSubStore,
  (globalState) => globalState.isSubscribeModalOpen,
);

const selectCurrentLanguage = createSelector(selectGlobalSubStore, (globalState) => globalState.currentLanguage);
const selectLanguages = createSelector(selectGlobalSubStore, (globalState) => globalState.languages);



const getPreferredLanguages = createSelector(selectGlobalSubStore, (globalState) => globalState.languageList);





const getNetworkStateSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.networkConnected;
});


const appLanguageSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.appLanguage;
});

const getModalOpenedSelector = createSelector(selectGlobalSubStore, (globalState) => {
  return globalState.modalOpened;
});



export {
  selectGlobalSubStore,
  globalStateSelector,
  isLoggedInSelector,
  userSelector,
  tokenSelector,
  isRouteChangingSelector,
  isLoadingSelector,
  selectGlobalError,
  selectIsGlobalError,
  selectIsSubscribeModalOpen,
  selectCurrentLanguage,
  selectLanguages,
  
  getPreferredLanguages,
  
  getNetworkStateSelector,
  
  appLanguageSelector,
  getModalOpenedSelector,
  
};
