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
        alignItems:'center',
        paddingTop:RfH(4),
    },
    
    mainHeadContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:RfH(8)
    },
    bgStyle:{
        height:'100%',width:'100%'
    },
   rightView: {
       height:RfH(128),width:RfW(110),
    },
    
    titleView:{
        alignItems: 'flex-start',
        justifyContent: 'center',
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