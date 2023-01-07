import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import commonStyles from '../../themes/commonStyles'
import { RfH, RfW } from '../../utils/helpers'
const styles = StyleSheet.create({
    container: {
        flex: 0.1,

    },
    backdropContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
      },
      topProfileNotch:{
        borderWidth: 2,
        borderRadius: RfW(66) / 2,
        position: 'absolute',
        width: RfW(66),
        borderLeftColor:colors.white,
        borderRightColor:colors.white,
        height: RfW(66),
        top: -RfH(38),
        left: '41%',
        borderColor: colors.white,
        justifyContent: 'center', alignItems: 'center'
      }

    })
export default styles