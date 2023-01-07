{/************  FIVVIA STORY VIEW *************/ }

import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import imagePath from '../../../constants/imagePath';
import FastImage from 'react-native-fast-image';

import commonStyles from '../../../themes/commonStyles';
import { RfH, RfW } from '../../../utils/helpers';
import { CustomText } from '../../../components';
import styles from '../styles';
import colors from '../../../constants/colors';



const CustomeImageView = ({user,customeStyle}) =>{
    return <View style={[styles.customeImgStyle,customeStyle]}>
         <CustomText
          color={colors.themeColor}
          fontSize={16}
          fontWeight={'bold'}
         >
          {user?.firstName && user?.firstName.substring(0, 1).toUpperCase()} {user?.lastName && user?.lastName.substring(0, 1).toUpperCase()}
        </CustomText>
      </View>
}

export default CustomeImageView
