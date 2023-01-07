import { StyleSheet } from 'react-native'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    inlineButtonSection:{
        marginHorizontal: RfW(24),
        borderRadius:RfH(8),
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: RfH(64),
        flexDirection:'row',
        height:RfH(48),
        justifyContent:'space-between',
        // ...commonStyles.shadowButton,
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
        // ...commonStyles.shadowButton,
        // backgroundColor:'rgba(255,255,255,0.3)',
        flex:1,
        borderRadius:RfH(0),
        justifyContent:'center',
        alignItems:'center'
    },
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
        // flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 0,
        borderRadius:RfH(8),
      },
      button: {
        borderRadius:RfH(8)
      },
  


})


export default styles