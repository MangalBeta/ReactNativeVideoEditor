import { StyleSheet } from 'react-native'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    container: {
        flex: 0.1,

    },
    paddChat:{
        paddingLeft:RfW(16),
        justifyContent:'center',
        alignItems:'flex-start',
        paddingTop:RfH(4),
    },
    
    mainHeadContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:RfW(16),
        // paddingVertical:RfH(16)
    },
    bgStyle:{
        height:'100%',width:'100%'
    },
   rightView: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center'
    },
    
    titleView:{
        flex: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'center',left:-RfW(10)
    },
    chatAvtarView: {
        height:RfH(42),width:RfW(42),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:RfH(42)/2,
    },
    chatAvtarImage: {
        borderRadius: RfH(42) / 2,
        height: '100%', width: '100%'
    },

})

export default styles