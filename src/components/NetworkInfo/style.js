import {
    StyleSheet,
  } from 'react-native';
  import {RfH, RfW} from '../../utils/helpers';
  
  const styles = StyleSheet.create({

  container: {
    backgroundColor:'rgb(245,247,249)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noBookingView: {
      paddingHorizontal:RfH(50),
  },
  headerContainer: {
    paddingHorizontal: RfW(25),
    paddingVertical: RfW(32),
  },
  bottomBtnContainer:{
    paddingVertical:RfW(15),
    marginHorizontal:RfW(22),
    borderRadius:RfH(50),   
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(38,33,25)'
  }
  });
  
  export default styles;
  