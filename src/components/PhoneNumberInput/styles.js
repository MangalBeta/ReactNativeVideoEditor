import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../constants/colors';
import { STANDARD_SCREEN_SIZE } from '../../constants/constants';
import { RfH, RfW, Width } from '../../utils/helpers'

const styles = StyleSheet.create({
    textInputStyle: {
      // flex: 1,
      color: colors.black,
      fontSize:RFValue(14,STANDARD_SCREEN_SIZE),
      fontWeight:'500',
      paddingBottom: 0,
      paddingHorizontal: 10,
      borderBottomWidth:1,
      borderBottomColor:'#E5E5E5',marginLeft:RfW(16),
      height:RfH(48),
      flex:1
    },
    label: {
      fontFamily: 'Gilroy',
      color: colors.black,
      opacity:0.6
    },
  });


  export default styles