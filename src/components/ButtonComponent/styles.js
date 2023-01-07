import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RfH, RfW } from '../../utils/helpers';
import colors from '../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../constants/constants';
import commonStyles from '../../themes/commonStyles';
const styles = StyleSheet.create({
    textStyle: {
      fontFamily: 'Gilroy',
    },
    label: {
      marginBottom: RfH(10),
      fontSize: RFValue(14,STANDARD_SCREEN_SIZE),
      fontFamily: 'Gilroy',
      color: colors.black,
    },
    textInputStyle: {flex:1},
    container: {
      flex: 1,
      // flexDirection: 'column',
      justifyContent: 'flex-end',
      marginBottom: -15,
      borderRadius:RfH(12),
    },
    button: {
      padding: RfH(16),
      borderRadius:RfH(12),
    },

    
    text: {
      backgroundColor: 'transparent',
      textAlign: 'center',
      color: colors.white,
      fontFamily: 'Gilroy',
      fontWeight:'600',
      fontSize: RFValue(14,STANDARD_SCREEN_SIZE),
    },
    bgFill: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
  });



  export default styles