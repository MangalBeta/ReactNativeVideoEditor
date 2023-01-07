import produce from 'immer';
import {
    getUser,
    setGlobalError,
    setIsLoggedIn,
    getAppMetaData,
    setSplashScreen,
    setCurrentNetworkState,
    setScreenTransitionCount,
    setDeviceLanguage,
    setModalOpened,
} from './actions';
import { isEmpty } from 'lodash';
import { BackHandler } from 'react-native';
import { localize } from '../constants/lang/index';
import { createlogOutUser } from '../redux/actions';
export const initialState = {
    user: {},
    isLoggedIn: false,
    languages: [],
    currentLanguage: {},
    isLoading: false,
    error: {},
    isError: false,
    languageList: [],
    appMetadata: [],

    isSplashScreenVisible: true,
    networkConnected: false,
    screenCount: 0,
    appMetadataFailed: false,
    appLanguage: null,
    modalOpened: false,

};

let handler = '';


export default (state = initialState, action) =>
    produce(state, (draft) => {
        if (action.type.includes('/REQUEST')) {
            draft.error = {};
            draft.isError = false;
            if (action.payload && action.payload.isLoading) {
                draft.isLoading = true;
                handler = BackHandler.addEventListener('hardwareBackPress', function () {
                    return true;
                });
            }
        } else if (action.type.includes('/FULFILL')) {
            if (action.payload && !action.payload.isLoading) {
                draft.isLoading = false;
                handler.remove();
            }
        }
        switch (action.type) {
            case setCurrentNetworkState.TRIGGER: {
                draft.networkConnected = action.payload;
                break;
            }
            case getUser.SUCCESS:
                break;

            case setIsLoggedIn.TRIGGER: {
                draft.isLoggedOutDone = false;
                draft.isLoggedIn = true;
                break;
            }

            case createlogOutUser.SUCCESS: {
                draft.isLoggedIn =false;
                break;
            }




            case setGlobalError.SUCCESS: {
                if (isEmpty(action.payload)) {
                    draft.error = { 'title': localize('tenantRegistration.unexpectedError'), 'message': localize('common.looksLikeUnexpectedError') };
                } else {
                    const { error } = action.payload;
                    debugger
                    draft.error = error;
                }

                draft.isError = true;
                break;
            }





            case setSplashScreen.TRIGGER: {
                draft.isSplashScreenVisible = false;
                break;
            }








            case setScreenTransitionCount.TRIGGER: {
                draft.screenCount = draft.screenCount === 3 ? 0 : draft.screenCount + 1;
                break;
            }

            case setDeviceLanguage.TRIGGER: {
                draft.appLanguage = action.payload;
                break;
            }

            case setModalOpened.TRIGGER: {
                const { isOpened } = action.payload;
                draft.modalOpened = isOpened;
                break;
            }
            default: {
                break;
            }
        }
    });
