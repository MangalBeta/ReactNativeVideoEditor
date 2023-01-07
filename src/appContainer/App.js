/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaView, StatusBar} from 'react-native';
import AppStack from '../routes';
import {Provider} from 'react-redux';
import {store} from '../redux/configureStore';
import MainContainer from './mainContainer';
import {navigationRef} from './rootNavigation';
import {setScreenTransitionCount} from './actions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStoreLanguage, initLocalisations } from '../constants/lang/index';
import colors from '../constants/colors';
import {socket,SocketContext} from "../utils/socket";

const getActiveRouteName = state => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

function App() {
  const routeNameRef = useRef();
  const [showTopBar, setShowTopBar] = useState(true);
  useEffect(() => {
    getStoreLanguage()
    initLocalisations(async () => { });
  }, []);


  useEffect(() => {
    const state = navigationRef.current.getRootState();
    if (state) {
      routeNameRef.current = getActiveRouteName(state);
    }
    // Orientation.lockToPortrait();
    // console.disableYellowBox = true;
  }, []);

  const onStateChangeHandle = (state) => {
    store.dispatch(setScreenTransitionCount.trigger());
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);
    const { params } = state.routes[state.index];
    if (params && params.hideTopBar) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
    routeNameRef.current = currentRouteName;
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
      <SocketContext.Provider value={socket}>

        <NavigationContainer ref={navigationRef} onStateChange={onStateChangeHandle}>
          {/* {showTopBar && <SafeAreaView style={{ flex: 0 }} />} */}
          <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
           <MainContainer>
            <AppStack />
          </MainContainer>
        </NavigationContainer>
        </SocketContext.Provider>

      </Provider>
      <FlashMessage position="top" />
     </GestureHandlerRootView>
  );
}

export default App;


export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}