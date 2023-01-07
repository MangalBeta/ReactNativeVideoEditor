{/************  FIVVIA STORY VIEW *************/ }

import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import imagePath from '../../../../constants/imagePath';
import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW } from '../../../../utils/helpers';
import { CustomText } from '../../../../components';
import styles from '../../styles';
import CustomeImageView from '../CustomeImageView';
const FriendListItems = ({ item, index }) => {
    return <View style={styles.listMainView}>
        <View style={styles.listImageSec}>
            <View style={styles.chatAvtarView}>
                {item?.thumbnailPath ? <FastImage
                    style={styles.chatAvtarImage}
                    source={{ uri: item?.thumbnailPath }}
                    resizeMode={'cover'}
                /> : <CustomeImageView user={{
                    firstName: item?.givenName,
                    lastName: item?.familyName,
                }}
                />}
            </View>
        </View>
        <View style={[styles.listMiddleView]}>
            <View style={styles.listMiddleSec1}>
                <CustomText color={'#292929'}
                    styling={{
                        lineHeight: 18
                    }}
                    fontSize={15} fontWeight={'bold'}
                >
                    {item?.givenName} {item?.familyName}
                </CustomText>
                <CustomText color={'rgba(0,0,0,0.7)'}
                    styling={{
                        lineHeight: 16
                    }}
                    fontSize={12}>
                    {item?.familyName}
                </CustomText>
            </View>
            <View style={[styles.listEndView, {
                flex: 0.75,
                alignItems: 'flex-start',
                flexDirection: 'row', justifyContent: 'space-between',
            }]}>

                <TouchableOpacity>
                    <Image source={imagePath?.ic_video} />
                </TouchableOpacity>
                <TouchableOpacity style={{

                }}>
                    <Image source={imagePath?.ic_audio} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={imagePath?.ic_message} />
                </TouchableOpacity>


            </View>
        </View>


    </View>
}
export default FriendListItems