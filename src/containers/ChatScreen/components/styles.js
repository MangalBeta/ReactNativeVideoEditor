import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../../constants/constants'
import commonStyles from '../../../themes/commonStyles'
import { RfH, RfW } from '../../../utils/helpers'
const styles = StyleSheet.create({
    rowFront: {
        flexDirection:'row',
        paddingHorizontal:RfW(16),
        alignItems:'center'
    },
    rightView: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginLeft: '45%',
        borderRadius: 5,
        marginTop: 25,

        marginRight: "5%",
        maxWidth: '50%',
        minWidth:'25%',
        alignSelf: 'flex-end',
        borderRadius: 16,
        borderWidth:1.5,
        borderColor:'#EBEBEB'
    },
    leftTimeView:{
        position:'absolute',left:24,
        bottom:-15,
    },
    emojiStyle:{
        height: RfH(28), width: RfH(28)
    },
    emojiStyleChat:{
        height: RfH(20), width: RfH(20)
    },
    padd4:{paddingHorizontal:RfW(4)},
    rowEmoji:{
        flexDirection: 'row',
        position: 'absolute',
        top: '12%',
        left: '5%',
        maxWidth: '80%',
        paddingVertical: RfH(8),
        backgroundColor: colors.white,
        paddingHorizontal: RfW(16),
        borderRadius: RfH(24)
    },
    rightTimeView:{
        position:'absolute',right:0,
        bottom:-20,
    },
    leftView:{
            backgroundColor: "#B0D0FF",
            padding: 10,
            paddingHorizontal:RfW(16),
            borderRadius: 5,
            marginTop: 20,
            marginLeft: "5%",
            minWidth:'25%',
            maxWidth: '50%',
            alignSelf: 'flex-start',
            borderRadius: 16,
        
    },

    reactionLeftView:{
        backgroundColor: "#B0D0FF",
        padding: 10,
        paddingHorizontal:RfW(16),
        borderRadius: 5,
        marginTop: 20,
        marginLeft: "5%",
        minWidth:'35%',
        maxWidth: '100%',
        alignSelf: 'flex-start',
        borderRadius: 16,
        position:'absolute',
        top:'16%'
    
},  
    padd16:{paddingHorizontal:RfW(16)},


    actionModalMain:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
    },
    blurView:{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    actionToModalView:{
        backgroundColor: 'rgba(255,255,255,0.4)',
        position: 'absolute',
        top: '14%', width: '60%',
        height: 'auto',
        left: '40%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderWidth: RfH(2),
        borderColor: '#FFFFFF',
        ...commonStyles.shadowButtonMid,
        shadowOpacity: 0.8,
        shadowRadius: 30
    },
    reactionActionToModalView:{
        backgroundColor: 'rgba(255,255,255,0.4)',
        position: 'absolute',
        top: '25%', 
        width: '50%',
        height: 'auto',
        left: '5%',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderWidth: RfH(2),
        borderRadius:16,
        borderColor: '#FFFFFF',
        ...commonStyles.shadowButtonMid,
        shadowOpacity: 0.8,
        shadowRadius: 30
    },

    subContainerTopModal:{ height: '100%', width: '100%', paddingVertical: RfH(16) },
    rightArrow: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10,
        borderBottomColor:'#EBEBEB',
        borderBottomWidth:1,
      },
      
      rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#F2F5FA",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20,
        borderColor:'#EBEBEB',
        borderWidth:1,
      
      },
      leftArrow: {
        position: "absolute",
        backgroundColor: "#B0D0FF",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10,
        
    },
    
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#F2F5FA",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    
    },
    reactionLeftArrow:{
        position: "absolute",
        backgroundColor: "#B0D0FF",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    reactionLeftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#F2F5FA",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    
    },
      
})


export default styles