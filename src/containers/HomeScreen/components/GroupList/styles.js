import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import colors from '../../../../constants/colors'
import commonStyles from '../../../../themes/commonStyles'
import { RfH, RfW, Width } from '../../../../utils/helpers'
const styles = StyleSheet.create({
    listContainer: {
        marginHorizontal: RfW(16),
        paddingVertical: RfH(16),
        borderBottomColor: colors.borderLight,
        borderBottomWidth: 1,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    leftImageView: {
        flex: 0.2,
        paddingLeft: 2,
        justifyContent: 'center', alignItems: 'center'
    },
    image: {
        height: RfH(60),
        width: RfW(60),
        borderRadius: 16
    },
    centerTitleView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 24
    },
    subCenterTitle: {
        flexDirection: 'row',
        paddingTop: RfH(4), justifyContent: 'center', alignItems: 'center'
    },
    providerCircle: {
        height: RfH(20),
        width: RfH(20),
        backgroundColor: '#03D3D9',
        borderRadius: RfH(20) / 2,
        marginRight: 8
    },
    paddTop: {
        paddingTop: RfH(4)
    },
    modalBackdrop: {
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
    blurView: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    blurViewContainer: {
        backgroundColor: 'white', position: 'absolute',
        bottom: 0, width: '100%',
        height: '80%',
        borderTopLeftRadius: RfH(20),
        borderTopStartRadius: RfH(20),
        borderTopEndRadius: RfH(20),
        borderTopRightRadius: RfH(20),
        ...commonStyles.shadowQuickFilter
    },
    termsBlurViewContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)', position: 'absolute',
        bottom: 10, width: '97%',
        height: '80%',

        borderTopLeftRadius: RfH(20),
        borderTopStartRadius: RfH(20),
        borderTopEndRadius: RfH(20),
        borderTopRightRadius: RfH(20),
        ...commonStyles.shadowQuickFilter,
        borderWidth: 4,
        borderColor: '#FFFFFF',

        borderBottomColor: 'transparent'

    },
    topHeaderTitle: {
        flexDirection: 'row',
        paddingVertical: RfH(16),
        //  ...commonStyles.shadowQuickFilter,
        borderBottomColor: '#F4F4F4',
        borderBottomWidth: 1,
        paddingBottom: RfH(16),
        borderTopLeftRadius: RfH(20),
        borderTopStartRadius: RfH(20),
        borderTopEndRadius: RfH(20),
        borderTopRightRadius: RfH(20),
        paddingHorizontal: RfW(8)
    },
    startContainer: {
        paddingTop: RfH(2),
        paddingHorizontal: RfW(6),
        justifyContent: 'center', alignItems: 'center'
    },
    startStyle: {
        alignSelf: 'center',
        marginHorizontal: 0,
        alignItems: 'center',
    },
    backIcon: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerTitle: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainView: { height: '100%', width: '100%' },
    lineHeight20: {
        lineHeight: 20
    },
    lineHeight16: {
        lineHeight: 20
    },
    lineHeightPadd: {
        lineHeight: 16,
        paddingBottom: 2,
    },
    groupMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        flex: 1,
        marginTop: RfH(12),
        paddingVertical: RfH(14),
        paddingHorizontal: RfW(12),
        borderRadius: RfH(4)
    },
    footerText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    newContactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: RfH(8)
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
    topProfileNotch: {
        borderWidth: 2,
        borderRadius: RfH(28),
        position: 'absolute',
        width: RfW(72),
        height: RfH(72),
        flex: 1,
        top: 40,
        left: Width() / 2.54,
        right: 0,
        bottom: 0,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdropContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
    },
    termsScroll: {
        flex: 1,
        marginTop: RfH(80),
    },
    breakLine: {
        height: 1,
        backgroundColor: 'rgba(151, 151, 151, 0.3)',
        width: RfW(50),
        alignSelf: 'center',
        marginTop: RfH(8),
        justifyContent: 'center', alignItems: 'center'
    },
    profileTerms: {
        marginTop: RfH(75),
        justifyContent: 'center', alignItems: 'center'
    },
    revisedTerms: {
        paddingVertical: RfH(16),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RfW(28)
    },
    padd16: {
        paddingVertical: RfH(16)
    },
    termBtn: {
        paddingHorizontal: RfW(20),
        paddingTop: RfH(24),
        flexDirection: 'row'
    },
   shadowBtn :{
        shadowColor:'rgba(0,0,0,0.24)',
        shadowRadius:4,
        shadowOffset: {
            width: 0,
            height: 20,
          },
        
    }


})

export default styles