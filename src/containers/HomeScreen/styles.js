import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../constants/constants'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: '#FFFFFF',
       
    },
    centerRow:{
        justifyContent:'center',alignItems:'center'
      },
    rowLetBack:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftIconOne:{
        backgroundColor:'#CADEFC',
        height:RfH(56),
        width:RfW(56),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:RfH(4),
      },
      activeleftIconOne:{
        backgroundColor:'#CADEFC',
        height:RfH(68),
        width:RfW(80),
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:RfH(8),
        borderBottomLeftRadius:RfH(8),

      },
      
      activeleftIconTwo:{
        backgroundColor:'#FAEFDC',
        height:RfH(68),
        width:RfW(80),
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:RfH(8),
        borderBottomLeftRadius:RfH(8),
        left:-RfW(10),
      },

      leftIconTwo:{
        backgroundColor:'#FAEFDC',
        height:RfH(56),
        width:RfW(56),
        justifyContent:'center',
        borderRadius:RfH(4),
        // marginLeft:RfW(8),
        alignItems:'center',
      },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: RfH(14),
        justifyContent: 'center',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:RfH(56),
    },
    backRightBtnLeft: {
        backgroundColor:'#FAEFDC',
        height:RfH(67),
        width:RfW(80),
        justifyContent:'center',
        alignItems:'center',
        right: RfW(70),
        borderTopRightRadius:RfH(8),
        borderBottomRightRadius:RfH(8),
        zIndex:100,
    },
    backRightBtnRight: {
        backgroundColor:'#CADEFC',
        height:RfH(67),
        width:RfW(80),
        justifyContent:'center',
        borderTopRightRadius:RfH(8),
        borderBottomRightRadius:RfH(8),
        marginLeft:RfW(8),
        alignItems:'center',
        right:0,
    },
    smallButton: {
        ...commonStyles.shadowButtonMid,
        backgroundColor: colors.shadowColor,
        borderRadius: RfH(8),
        height: RfH(48),
        paddingHorizontal: RfW(24),
        justifyContent: 'center',
        flex: 0.4
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: RfH(50) / 2,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    storyBtnView: {
        height: RfH(56),
        width: RfW(56),
        borderRadius: RfH(56) / 2,
        borderWidth: 1,
        flex: 1,
        marginHorizontal: RfW(11),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        ...commonStyles.shadowButtonMid,
        shadowColor: '#F6F6F6',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderLeftColor: '#4C70FF',
        borderRightColor: '#Fba919',
        borderTopColor: '#4C70FF',
        borderBottomColor: '#Fba919',

    },
    storyInnerBtnView: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: RfH(50), width: RfW(50),
        borderRadius: RfH(50) / 2,
        alignItems: 'center'
    },
    storyMainView: {
        height: RfH(76),
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatAvtarView: {
        height: RfW(56), width: RfW(56),
        borderRadius: RfW(56) / 2,
        borderWidth: 1.5,
        borderColor: '#E3E3E3',
        flex:1
    },
    chatAvtarGroupView: {
        height: RfW(56), width: RfW(56),
        borderRadius: RfW(22),
        borderWidth: 1.5,
        borderColor: '#E3E3E3',
        flex:1
    },
    chatAvtarGroupImage: {
        borderRadius: RfW(22),
        height: '100%', width: '100%',
    
    },
    chatAvtarImage: {
        borderRadius: RfW(56) / 2,
        height: '100%', width: '100%',
       
    },
    listMiddleView: {
        flex: 1,
        borderBottomWidth: 1,
        paddingBottom: RfH(12),
        marginLeft:RfW(4),
        flexDirection: 'row',
        borderBottomColor: '#E5E5E5', paddingHorizontal: RfW(8)
    },
    listMiddleSec1: {
        flex: 0.8,
        paddingTop:RfH(4)

    },
    listEndView: { flex: 0.25, alignItems: 'flex-end' },
    listImageSec: {
        height: RfW(56), width: RfW(56),
    },
    listMainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: RfH(4),
        paddingVertical: RfH(0),
        backgroundColor:'transparent',
    },
    activeSwipeView:{
        backgroundColor:'white',
        paddingLeft:RfW(16),
        borderRadius:RfH(8),
        paddingTop:RfH(6),
        paddingBottom:RfH(6),
        margin:0,
        ...commonStyles.shadowButtonMid,
        shadowColor:'rgba(0,0,0,0.6)',
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius:12,
          top:-1
        
    },
    customeImgStyle:{
        height: RfW(56), width: RfW(56),
        borderRadius: RfW(56) / 2,
        backgroundColor: colors.borderLight,
        justifyContent: 'center', alignItems: 'center'
      },
      loading: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    emptyText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
   
      
      


})

export default styles