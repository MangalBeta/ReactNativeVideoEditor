import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../../../constants/colors'
import { STANDARD_SCREEN_SIZE } from '../../../../constants/constants'
import { RfH, RfW } from '../../../../utils/helpers'
const styles = StyleSheet.create({
      friendListCon: { paddingTop: RfH(24), paddingHorizontal: RfW(16) },
      newContactContainer :{
        flexDirection: 'row',
        marginBottom: RfH(2),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:8
      },
      centerNewContactStyle: {
        flex: 0.8, paddingLeft: RfW(16),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: RfH(8)
      },
      activeFriendTabStyle:{
        // marginTop: RfH(8),
        // backgroundColor: '#FBA919',
        // height: RfH(2),
        // width: RfW(32),
        // justifyContent:'center',
        // alignItems:'center'
        borderBottomWidth:2,
        paddingBottom:2,
        borderBottomColor:'#FBA919'
      },
     


})

export default styles