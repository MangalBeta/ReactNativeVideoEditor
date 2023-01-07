import {StyleSheet} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../constants/colors';

import { STANDARD_SCREEN_SIZE } from '../../constants/constants';
import commonStyles from '../../themes/commonStyles';
import { RfH, RfW } from '../../utils';

  const styles = StyleSheet.create({
    verification: {
      fontSize: RFValue(16,STANDARD_SCREEN_SIZE),
      color: colors.black,
    },
    codesendto: {
      fontSize: RFValue(12,STANDARD_SCREEN_SIZE),
      color: colors.black,
      marginTop: RfH(10),
    },
    cellStyle: {
      borderWidth: 1,
      borderColor:'rgba(151, 151, 151, 0.2)',
      borderRadius:RfH(8),
      height:RfH(72)
    },
    cellStyleFocused: {
      borderColor:'rgba(151, 151, 151, 0.2)',
    },
    textStyleCodeInput: {
      fontSize: RFValue(24,STANDARD_SCREEN_SIZE),
      color: colors.black,
    },
    textStyleFocused: {
      fontSize: RFValue(24,STANDARD_SCREEN_SIZE),
      color: colors.black,

    },
    maskStyle: {
      width: 10,
      height: 10,
      borderRadius: 25,
      backgroundColor: colors.black,
    },
    didntgetOtp: {
      fontSize: RFValue(10,STANDARD_SCREEN_SIZE),
      color: colors.black,
      marginTop: RfH(30),
    },
    smallButton:{
      ...commonStyles.shadowButtonMid,
      backgroundColor: colors.shadowColor,
      borderRadius: RfH(8),
      height: RfH(48),
      paddingHorizontal: RfW(24),
      justifyContent: 'center',
      flex: 0.4
    },
    alreadyTextContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: RfH(65)
    },
    phoneInputView: {
      marginTop: RfH(32),
      flex: 1,

    },
    topView:{
      paddingVertical: RfH(12),
      flex: 1
    },
    keyBoardView: {
      flex: 1,
      paddingHorizontal: RfW(24)
    },
    alreadytextView:{ flex: 0.8,
    justifyContent:'center'
    },

  });

  export default styles
