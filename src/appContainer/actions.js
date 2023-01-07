import { createRoutine } from 'redux-saga-routines';
import {
  CHANGE_LANGUAGE,
  GET_LANGUAGES,
  GET_USER,
  RESET_APP,
  SET_GLOBAL_ERRORS,
  SET_IS_LOGGED_IN,
  ROUTE_CHANGE,
  SPLASH_SCREEN,
  SET_NETWORK_STATE,
  SET_SCREEN_COUNT,
  SET_LANGUAGE,
  MODAL_OPENED,
} from './constants';

export const resetApp = createRoutine(RESET_APP);
export const getUser = createRoutine(GET_USER);
export const setGlobalError = createRoutine(SET_GLOBAL_ERRORS);
export const getLanguages = createRoutine(GET_LANGUAGES);
export const changeLanguage = createRoutine(CHANGE_LANGUAGE);
export const setIsLoggedIn = createRoutine(SET_IS_LOGGED_IN);
export const routeChange = createRoutine(ROUTE_CHANGE);
export const setSplashScreen = createRoutine(SPLASH_SCREEN);
export const setCurrentNetworkState = createRoutine(SET_NETWORK_STATE);
export const setScreenTransitionCount = createRoutine(SET_SCREEN_COUNT);
export const setDeviceLanguage = createRoutine(SET_LANGUAGE);
export const setModalOpened = createRoutine(MODAL_OPENED);
