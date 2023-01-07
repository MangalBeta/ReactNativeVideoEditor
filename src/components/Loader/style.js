import {
  StyleSheet,
} from 'react-native';
import colors from '../../constants/colors';
import {RfH, RfW} from '../../utils/helpers';

const styles = StyleSheet.create({
  modalBackground: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flex:1,
    zIndex: 99999,
    elevation:1,
    width: '100%',
    top: 0,
    bottom: 0,
  },
  activityIndicatorWrapper: {
    backgroundColor: colors.white,
    height: RfH(100),
    width: RfW(160),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    color: colors.black,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
});

export default styles;
