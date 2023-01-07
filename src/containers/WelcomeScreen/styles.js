import { StyleSheet } from 'react-native'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBgStyle: {
        height: '100%',
        width: '100%'
    },
    secondSection: {
        paddingHorizontal: RfW(16),
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    textStylesDesc: {
        opacity: 0.6,
        textAlign: 'center',
        lineHeight: 18

    },
    inlineButtonSection:{
        marginHorizontal: RfW(24),
        borderRadius:RfH(8),
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: RfH(64),
        flexDirection:'row',
        height:RfH(48),
        justifyContent:'space-between',
        ...commonStyles.shadowButton,
    },
    activeButtonStyle:{
        ...commonStyles.shadowButton,
        backgroundColor:'#FFFFFF',
        flex:1,
        borderRadius:RfH(8),
        justifyContent:'center',
        alignItems:'center'
    },
    inActiveButtonStyle:{
        ...commonStyles.shadowButton,
        backgroundColor:'transparent',
        flex:1,
        borderRadius:RfH(8),
        justifyContent:'center',
        alignItems:'center'
    }


})


export default styles