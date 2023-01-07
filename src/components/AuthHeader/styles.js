import { StyleSheet } from 'react-native'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW ,Width} from '../../utils/helpers'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBgStyle: {
        height: '100%',
        width: '100%'
    },
    titleView:{
        paddingVertical: RfH(16),
        paddingHorizontal: RfW(24)
      },
      wrapperBtnView:{ paddingTop: RfH(16) },
      backArrowStyle:{
        paddingVertical: RfH(8),
        justifyContent: 'flex-start',
        paddingHorizontal: RfW(16)
      },
      imageStyle:{
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12
      },
      mainHeadContainer: {
        // flex: 0.4
        height:RfH(200)
      },
      bottomLogoStyle:{
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute', bottom: -RfH(25), right: Width() / 16
      }
  
  

})


export default styles