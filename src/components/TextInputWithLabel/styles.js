import { StyleSheet } from 'react-native';
import { RfH, RfW } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  innerTextWrapStyle: {
    width: '100%',
  },
  defaultTextInputStyle: {
    color: '#000',
    padding: 6,
    width: '100%',
  },
  defaultFocusedLabelStyle: {
    fontFamily: 'Gilroy',
    left: 0,
    top: -12,
    fontSize: 11,
  },
  defaultUnfocusedLabelStyle: {
    fontFamily: 'Gilroy',
    left: 0,
    fontSize: 16,
  },
  labelIconStyle: {
    position: 'absolute',
    left: 5,
    resizeMode: 'contain',
  },
  rightIconStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIconTextStyle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 14,
    color: 'rgb(10, 169, 234)',
    paddingRight: 13,
  },
  clearBtnWrap: {
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 10,
    // borderRadius: 20,
  },
  clearBtnStyle: {
    // color: '#000000',
    fontSize: 13,
    // backgroundColor: '#ffffff',
    overflow: 'hidden',
    height:RfH(24),
    width:RfW(24),
    paddingTop:RfH(3),
    borderRadius:RfH(24)/2
  },
  occupantsTextStyle: {
    fontSize: 14,
    fontFamily: 'Gilroy',
    color: '#313943',
  },
  textInputViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtnStyle: {
    paddingHorizontal: 6,
    width: RfH(20),
    height: RfW(20),
    // tintColor: '#737373',
  },
  manatoryField: {
    color: 'rgb(255, 0, 0)',
    fontSize: 14,
    fontFamily: 'Gilroy',
  },
  errorTextStyle: {
    color: '#cc0000',
  },
  alignTextRight: {
    alignItems: 'flex-start',
  },
});

export default styles;
