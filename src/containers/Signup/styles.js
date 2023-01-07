import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../constants/constants'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    callingCodeTextStyle:{

    },
    smallButton:{
        // ...commonStyles.shadowButtonMid,
        borderRadius: RfH(12),
        paddingHorizontal: RfW(24),
        justifyContent: 'center',
        paddingVertical:RfH(8)
      },
      alreadytextView:{ flex: 0.9 },
      alreadyTextContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RfH(15)
      },
      phoneInputView: {
        marginTop: RfH(0),
        flex: 1
      },
      topView:{
        paddingVertical: RfH(0),
        flex: 1
      },
      keyBoardView: {
        flex: 1,
        paddingHorizontal: RfW(24),
      },
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
     overlay : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: RfH(50) / 2,
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    storyBtnView :{
      height: RfW(48),
      width: RfW(48),
      borderRadius: RfW(48) / 2,
      borderWidth: 1,
      marginHorizontal: RfW(11),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      ...commonStyles.shadowButtonMid,
      shadowColor: '#F6F6F6',
      backgroundColor: 'white',
      borderLeftColor: '#4C70FF',
      borderRightColor: '#Fba919',
      borderTopColor: '#4C70FF',
      borderBottomColor: '#Fba919',

  },
  storyInnerBtnView:{
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: RfW(48), width: RfW(48),
    borderRadius: RfW(48) / 2,
    alignItems: 'center'
},
storyMainView:{
  justifyContent: 'center',
  alignItems: 'center'
}

})

export default styles