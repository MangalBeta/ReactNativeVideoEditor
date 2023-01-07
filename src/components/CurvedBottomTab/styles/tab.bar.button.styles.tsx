import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
    elevation: 12,
  },
  squareFocusedButton: {
    borderRadius: 16,
  },
  tabBarLabelWrapper: { zIndex: 12, alignItems: 'center' },
  focusedButton: {
    position: 'absolute',
    height: 72,
    width: 72,
    backgroundColor:'#5D6175',
    zIndex: -1,
    borderRadius: 36,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'rgba(216, 216, 216, 0)'
  },
  linearIconStyle:{
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 52/2,
  },
  unfocusedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    elevation: 12,
    zIndex: -1,
  },
});
