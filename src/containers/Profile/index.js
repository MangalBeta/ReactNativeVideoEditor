import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { CustomText } from '../../components';
const Profile = ({show, onRetry, isRetrying}) => {
  return (
    <View >
      <CustomText>Home Screen</CustomText>
    </View>
  );
};
export default React.memo(Profile);
