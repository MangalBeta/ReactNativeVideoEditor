import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
  } from '@react-navigation/native';
  import {createStackNavigator} from '@react-navigation/stack';
  import React, { useEffect, useState } from 'react';
  import AuthStack from './AuthStack';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabStack';
import DrawerRoutes from './DrawerStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AddStory, ChatScreen,GroupDetails } from '../containers';
import { isLoggedInSelector } from '../appContainer/selectors';
import { getUserLoginDataSelector } from '../redux/selectors/profile';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { getSaveData } from '../utils';
import { LOCALSTORAGE_DATA_KEY } from '../constants/constants';
const stateSelector = createStructuredSelector({
  isLoggedIn: isLoggedInSelector,
   userData   :getUserLoginDataSelector
});
  const Stack = createStackNavigator();

  export default  function Routes() {
    const { isLoggedIn, userData } = useSelector(stateSelector);
    const [isTokenExits,setToken] = useState(null)
    useEffect(()=>{
      getToken()
    },[userData])
    useEffect(()=>{
      getToken()
    },[])
    const getToken  = async () =>{
      const token =  await getSaveData(LOCALSTORAGE_DATA_KEY.USER_TOKEN);
      setToken(token)
    }
    return (
        <> 
          <Stack.Navigator>
          {
          isLoggedIn || userData || isTokenExits ? <> 
         <Stack.Screen
            name={navigationStrings.DRAWER_ROUTES}
            component={DrawerRoutes}
            options={{ headerShown: false, gestureEnabled: false }}
          />
            <Stack.Screen
            name={navigationStrings.CHAT_SCREEN}
            component={ChatScreen}
            options={{headerShown: false, gestureEnabled: false}}
          />
           <Stack.Screen
            name={navigationStrings.GROUP_DETAILS_SCREEN}
            component={GroupDetails}
            options={{headerShown: false, gestureEnabled: false}}
          />
           <Stack.Screen
            name={navigationStrings.ADD_STORY_SCREEN}
            component={AddStory}
            options={{headerShown: false, gestureEnabled: false}}
          />
           </> :AuthStack(Stack)}
          </Stack.Navigator>
      
        </>
    );
  }
  