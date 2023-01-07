{/************  FIVVIA STORY VIEW *************/ }

import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import imagePath from '../../../../constants/imagePath';
import FastImage from 'react-native-fast-image';

import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW ,decryptData} from '../../../../utils/helpers';
import { CustomText } from '../../../../components';
import styles from '../../styles';
import moment from 'moment';
import CustomeImageView from '../CustomeImageView';
const ChatListItems = ({item,index,onPress, isSelectedRow=false ,chatRowOpen,user}) => {
const info = item?.chatData?.info?.length && item?.chatData?.info.filter(x=> x?.userId == user?._id)
const renderCustomeImageView = (pro) =>{
    return <CustomeImageView user={pro} />
 
}


const customeStyle = isSelectedRow?  styles.activeSwipeView : {}
  return <View style={[styles.listMainView,
        customeStyle]}>
        <View style={styles.listImageSec}>
            <View style={[item?.groupId ?styles.chatAvtarGroupView : styles.chatAvtarView]}>
               {item?.userId?.profilePicURL ? <FastImage
                    style={[item?.groupId ? styles.chatAvtarGroupImage : styles.chatAvtarImage]}
                    source={{ uri: item?.userId?.profilePicURL?.thumbnail }}
                    resizeMode={'cover'}
                /> : renderCustomeImageView(item?.userId)}
            </View>
        </View>
        <TouchableOpacity 
        onPress={onPress}
        style={[styles.listMiddleView,
            isSelectedRow &&  {
                borderBottomWidth:0
            }
        ]}>
            <View style={styles.listMiddleSec1}>
                <CustomText color={'#292929'}
                    styling={{
                        lineHeight: 18
                    }}
                    fontSize={15} fontWeight={'bold'}
                >
                   {item?.userId?.firstName}  {item?.userId?.lastName}
                </CustomText>
                <CustomText color={'rgba(0,0,0,0.7)'}
                    styling={{
                        lineHeight: 16
                    }}
                    fontSize={12}>
                     {item?.userId?.userName}
                </CustomText>
                <CustomText
                numberOfLines={1}
                    styling={{
                        lineHeight: 16,
                    }}
                    color={'#292929'} fontSize={12} >
                    {decryptData(item?.chatData?.text,item?.chatData?.senderId)}
                </CustomText>
            </View>
            <View style={styles.listEndView}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    {item?.isMuted && <Image source={imagePath?.ic_mute} />}
                    <View style={{ paddingLeft: 8 }}>
                       {item?.isPin && <Image source={imagePath?.ic_pin} />}
                    </View>
                </View>
                <CustomText
                    styling={{
                        lineHeight: 16,
                        paddingTop: RfH(8)
                    }}
                    color={'rgba(0,0,0,0.7)'} fontSize={10} fontWeight={'500'} >
                    {moment(item?.chatData?.createdAt).fromNow()}
                </CustomText>
                    <View style={{
                        paddingTop:RfH(4)
                    }}>
                    {info?.[0]?.messageStatus == 'READ' && <Image source={imagePath?.tickdelivered} /> }
                  {info?.[0]?.messageStatus == 'SENT' && <Image source={imagePath?.ticksingle} /> }
                  {info?.[0]?.messageStatus == 'DELEVIRED' && <Image source={imagePath?.tickdouble} /> }
                    </View>
               

        
            </View>

        </TouchableOpacity>


    </View>
    
}
export default ChatListItems