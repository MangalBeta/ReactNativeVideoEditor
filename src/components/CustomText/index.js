import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from '../../constants/constants';

const CustomText = props => {
  const {
    fontSize,
    fontWeight,
    fontStyle,
    color,
    styling,
    fontFamily,
    numberOfLines,
    onPress,
  } = props;
  const finalStyle = {
    fontSize: RFValue(fontSize, STANDARD_SCREEN_SIZE),
    fontWeight,
    fontStyle,
    fontFamily,
    color,
    ...styling,
  };
  return (
    <Text
      numberOfLines={numberOfLines}
      style={finalStyle}
      onPress={onPress}
    >
      {props.children}
    </Text>
  );
};
CustomText.propTypes = {
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  fontStyle: PropTypes.string,
  color: PropTypes.string,
  styling: PropTypes.object,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
};
CustomText.defaultProps = {
  fontSize: 14,
  fontWeight: 'normal',
  fontStyle: 'normal',
  color: '#000000',
  styling: {},
  fontFamily: 'Gilroy',
  numberOfLines: 0,
  onPress: null,
};
export default CustomText;
