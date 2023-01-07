
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
    blurView: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    mainCustomHeader: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: RfH(16),
        borderBottomRightRadius: RfH(16),
        paddingTop: RfH(4),
        ...commonStyles.shadowHomeTabs,
        elevation: 1,
        // iOS
        shadowColor: 'rgba(0,0,0,0.16)',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        borderColor: '#B0D0FF',
        borderBottomColor: '#B0D0FF',
        borderBottomWidth: 1,
        borderWidth: 1,
        borderTopWidth: 0
    },
    headerHeight: {
        width: '100%',
        height: RfH(58), backgroundColor: 'white'
    }

})


export default styles