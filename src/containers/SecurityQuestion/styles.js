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

      signUpView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: RfH(10),
        marginTop:RfH(12)
      },
      topView:{
        paddingVertical: RfH(8),
        flex: 1
      },
      questionRow:{
        flex:1,
        borderWidth:1,
        height:RfH(40),
        borderRadius:RfH(8),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
         paddingHorizontal:RfW(16),
          backgroundColor:'#FFFFFF',
        ...commonStyles.shadowSecurity,
         //rgba(151, 151, 151, 0.2)
        paddingVertical:RfH(8)

      
    },
    inputTextContainer:{
      borderLeftWidth:1,
      borderRightWidth:1,
      borderLeftColor:colors.shadowColor,
      borderRightColor:colors.shadowColor,
      borderBottomRightRadius:8,
      borderBottomLeftRadius:8,
      borderBottomColor:colors.shadowColor,
      top:-8,
      height:RfH(48),
      justifyContent:'center',
      paddingTop:RfH(4),
      paddingHorizontal:RfW(10)
    },
    inputTextOwnerContainer:{
      borderLeftWidth:1,
      borderRightWidth:1,
      borderLeftColor:'#EAEAEA',
      borderRightColor:'#EAEAEA',
      borderBottomRightRadius:8,
      borderBottomLeftRadius:8,
      // borderBottomColor:colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR,
      top:-8,
      height:RfH(48),
      justifyContent:'center',
      paddingTop:RfH(4)
    },
    inputTextQuesContainer:{
      borderWidth:1,
      borderRadius:RfH(8),
      borderColor:'#EAEAEA',
      // borderBottomColor:colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR,
      height:RfH(48),
      justifyContent:'center',
      paddingTop:RfH(4),
      backgroundColor:'#FFFFFF',
      ...commonStyles.shadowSecurity
    },

    inputTextColor:{
      fontSize:14,
      color:colors.black
    }
     

})

export default styles