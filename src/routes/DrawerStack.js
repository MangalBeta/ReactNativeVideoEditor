import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {Image, View,Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { HomeScreen } from '../containers';
import navigationStrings from '../constants/navigationStrings';
import TabRoutes from './TabStack';
import { RfH, RfW, Width } from '../utils';
import colors from '../constants/colors';

const Drawer = createDrawerNavigator();
export default function DrawerRoutes(props) {
  var brandTab = null;
  var gestureEnabled = true;
  var swipeEnabled = false;
  return (
    <Drawer.Navigator
      drawerPosition={'bottom'}
      backBehavior={'initialRoute'}
      defaultStatus="closed"
      drawerType={'front'}
      overlayColor={'rgba(255,255,255,0.8)'}
      // hideStatusBar={true}
      screenOptions={{
        gestureEnabled: true,
        drawerStyle:{ width: '100%',
         backgroundColor:'rgba(255,255,255,0.8)'
      },
        drawerType: Width() >= 768 ? 'permanent' : 'front',
      }}
      drawerContent={(props) => <CustomDrawerContent 
      {...props} />}>
      <Drawer.Screen
        component={TabRoutes}
        name={navigationStrings.TAB_ROUTES
        }
        options={{
            headerShown: false,
          gestureEnabled: gestureEnabled,
          swipeEnabled: swipeEnabled,
          drawerLabel:'OUTER',
          drawerIcon: ({focused}) => (
            <Image
            source={imagePath?.ic_chat}
            />
          ),
        }}
      />
    
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
});
