import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { STANDARD_SCREEN_SIZE } from '../../../../constants/constants'
import { RfH, RfW } from '../../../../utils/helpers'
const styles = StyleSheet.create({
      inputFocusedFontSize: {
        color: 'rgba(0,0,0,0.5)',
        fontWeight:'bold'
      },
      inputUnfocusedFontSize: {
        fontSize: RFValue(14,STANDARD_SCREEN_SIZE),
        paddingTop: 0,
        color: 'rgba(0,0,0,0.5)',
        fontWeight:'bold'
      },
      inputTextContainer: {
        minHeight: RfH(48),
        // marginBottom: RfH(10),
        marginTop: RfH(8),
      },
      inputTextColor: {
        color: '#000000',
        paddingBottom: 0,
      },
      phoneInputView: {
        marginTop: RfH(0),
        flex: 1
      },
   

})

export default styles