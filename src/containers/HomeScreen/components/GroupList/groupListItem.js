{/************  FIVVIA STORY VIEW *************/ }

import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import imagePath from '../../../../constants/imagePath';
import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW } from '../../../../utils/helpers';
import { CustomText } from '../../../../components';
import styles from './styles';
const GroupListItems = ({ item, index ,count,onPressItem}) => {
    return <TouchableOpacity 
    onPress={()=> onPressItem(item)}
    style={styles.groupMainContainer}>
        <View>
        <CustomText
                fontWeight='600'
                fontSize={12}
                color='#282626'>
               {item?.name} {count ? `: ${count}` :''}
            </CustomText>
        </View>
        <View>
            <Image source={imagePath?.ic_dropdown} />
        </View>
    </TouchableOpacity>
}
export default GroupListItems