{/************  FIVVIA STORY VIEW *************/ }

import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import imagePath from '../../../../constants/imagePath';
import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW } from '../../../../utils/helpers';
import { CustomText } from '../../../../components';
import FastImage from 'react-native-fast-image';

import styles from '../../styles';
const CallsListItems = ({ visible }) => {
    return <View style={styles.listMainView}>
        <View style={styles.listImageSec}>
            <View style={styles.chatAvtarView}>
                <FastImage
                    style={styles.chatAvtarImage}
                    source={{ uri:'https://picsum.photos/100/100' }}
                    resizeMode={'cover'}
                />
            </View>
        </View>
        <View style={styles.listMiddleView}>
            <View style={styles.listMiddleSec1}>
                <CustomText color={'#292929'}
                    styling={{
                        lineHeight: 18
                    }}
                    fontSize={15} fontWeight={'bold'}
                >
                    Iqbal Abdullah
                </CustomText>
                <CustomText color={'rgba(0,0,0,0.7)'}
                    styling={{
                        lineHeight: 16
                    }}
                    fontSize={12}>
                    @abdullah
                </CustomText>
                <View style={{flexDirection:'row',paddingTop:RfH(2)}}>
                    <Image 
                    resizeMode='contain'
                    source={imagePath?.ic_audio_calls} />
                    <CustomText
                    styling={{
                        lineHeight: 16,
                        paddingLeft:RfW(4)
                    }}
                    color={'#292929'} fontSize={12} >
                   Outgoing
                </CustomText>
                </View>
               
            </View>
            <View style={[styles.listEndView,{flex:0.3}]}>
                <CustomText
                    styling={{
                        lineHeight: 16,
                        paddingTop: RfH(8)
                    }}
                    color={'rgba(0,0,0,0.7)'} fontSize={12} fontWeight={'500'} >
                   Yesterday
                </CustomText>
            </View>
        </View>


    </View>
}
export default CallsListItems