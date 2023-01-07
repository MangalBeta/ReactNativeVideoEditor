import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const commonStyles = StyleSheet.create({
  shadowButton: {
    // Android
    elevation: 1,
    // iOS
    shadowColor:'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.16,
    shadowRadius:30,
  },
  shadowInlineButton: {
    // Android
    elevation: 1,
    // iOS
    shadowColor:'rgba(0,0,0,0.22)',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.16,
    shadowRadius:30,
  },
  shadowButtonMid: {
    // Android
    elevation: 1,
    // iOS
    shadowColor:'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.6,
    shadowRadius:30,
  },
  shadowDrawer:{
    elevation: 1,
    // iOS
    shadowColor:'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 4,
      height: 16,
    },
    shadowOpacity: 0.16,
    shadowRadius:30,
  },
  shadowSecurity:{
     // Android
     elevation: 1,
     // iOS
     shadowColor:'rgba(0,0,0,0.16)',
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.11,
     shadowRadius:16,
  },
  shadowTabs:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 26,
    
    elevation: 10,
  },
  shadowHomeTabs:{
    elevation: 1,
    // iOS
    shadowColor:'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.1,
    shadowRadius:12,
  },
  shadowQuickFilter: {
    // iOS
    shadowColor: colors.SHADOW_QUICK_BLACK,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    // Android
    elevation: 3,
  },
  shadowDetailsTitleView: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.5,
    shadowRadius: 32.62,
    
    elevation: 4,
  },
  
  
});

export default commonStyles;
