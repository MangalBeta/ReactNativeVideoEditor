import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../../../constants/constants'
import commonStyles from '../../../../themes/commonStyles'
import { RfH, RfW } from '../../../../utils/helpers'
const styles = StyleSheet.create({
      friendListCon: { paddingTop: RfH(24), paddingHorizontal: RfW(16) },
      listMiddleSec1: {
        flex:1,
        paddingTop:RfH(4)

    },
    followingStyle: { 
        backgroundColor:'#E8F1FE',
        borderRadius:RfH(8),
        height:RfH(30),
        marginTop:RfH(4),
        width:RfW(72),
        justifyContent:'center',
        alignItems:'center',
    },
    followStyle: { 
        backgroundColor:colors.themeColor,
        borderRadius:RfH(8),
        height:RfH(30),
        marginTop:RfH(4),
        width:RfW(72),
        justifyContent:'center',
        alignItems:'center',
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
        minHeight: RfH(40),
        backgroundColor:'#E9E9E9',
        // marginBottom: RfH(10),
        borderRadius:RfH(8),
        opacity:0.7,
        borderWidth:0.2,
        borderBottomWidth:0.6,
        borderColor:'rgba(0, 0, 0, 0.16)',
        borderBottomColor:'rgba(0, 0, 0, 0.16)',
        ...commonStyles.shadowButtonMid
      },
      inputTextColor: {
        color: '#000000',
      },

})

export default styles