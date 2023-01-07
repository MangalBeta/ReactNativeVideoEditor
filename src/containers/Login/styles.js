import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../constants/constants'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
   
      keyBoardView: {
        flex: 1,
        paddingHorizontal: RfW(24)
      },
      phoneInputView: {
        marginTop: RfH(24),
        flex: 1
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
        marginBottom: RfH(8),
        marginTop: RfH(10),
      },
      inputTextColor: {
        color: '#000000',
        paddingBottom: 0,
      },
      signUpView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: RfH(10),
        marginTop:RfH(12)
      },
      forgotView: {
        paddingVertical: RfH(16),
        justifyContent:'flex-end',alignItems:'flex-end',
      },
      captchaView:{
        paddingBottom: RfH(8),
        flexDirection:'row',
        marginTop:RfH(16),
        justifyContent:'space-between'
      },

      byContinue: {
        lineHeight: RfH(14),
      },
      signUpText: {
        color: colors.themeColor,
      },
      cacheIconView:{
        justifyContent:'center'
      },
      captchaBtnView: {
        backgroundColor:'#E8F1FE',
        height:RfH(48),
        paddingHorizontal:RfW(16),
        justifyContent:'center',
        borderColor:'#D3DAE5',
        borderWidth:1,
        borderRadius:RfH(8),
        width:'50%'
      },
      

})

export default styles