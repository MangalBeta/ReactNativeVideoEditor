import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    inlineButtonSection:{
        marginHorizontal: RfW(16),
        backgroundColor:'white',
        flexDirection:'row',
        height:RfH(40),
        justifyContent:'space-between',
        ...commonStyles.shadowTabs,
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOpacity:0.2,
        borderRadius:RfH(8),
        elevation:1
        // paddingHorizontal:RfW(4)

    },
    activeButtonStyle:{
        ...commonStyles.shadowButtonMid,
        backgroundColor:'#B0D0FF',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        shadowColor:'#B0D0FF',
        shadowOpacity:0.2,
        paddingHorizontal:RfW(8),
        shadowOpacity:0.4,
        // marginVertical:4,
        // marginHorizontal:4
    },
    inActiveButtonStyle:{
        ...commonStyles.shadowTabs,
        backgroundColor:'white',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:RfW(8),
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOpacity:0.2
    },


})


export default styles