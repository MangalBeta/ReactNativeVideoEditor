import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { alertBox } from '../utils/helpers';
import { View, Animated, StyleSheet } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { isLoadingSelector, isLoggedInSelector, selectGlobalError, selectIsGlobalError } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, NetworkInfo } from '../components';
import NetInfo from '@react-native-community/netinfo';
import { setCurrentNetworkState } from './actions';
import { usePromiseTracker } from 'react-promise-tracker';
import * as RootNavigation from './rootNavigation';
import * as SplashScreen from 'expo-splash-screen';

import { getUserLoginDataSelector } from '../redux/selectors/profile';
import { color } from 'react-native-reanimated';
import colors from '../constants/colors';
import AnimatedLottieView from 'lottie-react-native';
import { LOTTIE_JSON_FILES } from '../constants/constants';

let currentNetwork;
NetInfo.fetch().then((state) => {
  currentNetwork = state.isConnected;
});

const stateSelector = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
  isLoading: isLoadingSelector,
  isError: selectIsGlobalError,
  error: selectGlobalError,
  userData: getUserLoginDataSelector
});

function MainContainer(props) {
  const { isLoggedIn, isLoading, userData, isError, error } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  const [netInfo, setNetInfo] = useState(currentNetwork);
  const { promiseInProgress } = usePromiseTracker();
  useEffect(() => {
    // if(isLoggedIn){
    //   moveToNewScreen(navigationStrings.DRAWER_ROUTES)()
    // }
  }, [isLoggedIn])
  const moveToNewScreen =
    (screenName, data = {}) =>
      () => {
        RootNavigation.navigate(screenName);
      };
      
  const checkConnection = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setCurrentNetworkState.trigger(state.isConnected));
      setNetInfo(state.isConnected);
    });
    return () => unsubscribe();
  };

  const handleRequest = () => {
    NetInfo.fetch().then((state) => {
      dispatch(setCurrentNetworkState.trigger(state.isConnected));
      setNetInfo(state.isConnected);
    });
  };


  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    console.log(isError, "isErrorisError", error)
    if (isError && (error)) {
      alertBox('', error?.message || error);
    }
  }, [isError]);



  useEffect(() => {
    async function prepare() {
      try {
        SplashScreen.hideAsync();
        // Pre-load fo
        // nts, make any API calls you need to do here
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setTimeout(() => {
          setAppIsReady(true);
        }, 0)
      }
    }
    prepare();
  }, []);
  if (!appIsReady) {
    return <AnimatedLottieView
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
      }}
      source={LOTTIE_JSON_FILES.splashJson}
      resizeMode="contain"
      loop={false}
      autoPlay
    />;
  }



  return (
    <>
      <NetworkInfo netInfo={netInfo} handleRequest={handleRequest} />
      <Loader isLoading={isLoading || promiseInProgress} />
      {props.children}
    </>
  );
}

export default MainContainer;