import React, { useRef, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import colors from '../../constants/colors';
import { localize } from '../../constants/lang';
import { RfH, RfW, center } from '../../utils/helpers';
import CustomText from '../CustomText';
import styles from './styles'
const ListEmptyComponent = ({ }) => {

    return <View style={styles.emptyContainer}>
        <CustomText
            fontSize={18}
        >{localize('common.NoDataFound')}</CustomText>
    </View>


}


export default ListEmptyComponent