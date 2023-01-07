/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomText } from '../../../components';
import colors from '../../../constants/colors';
import { STANDARD_SCREEN_SIZE } from '../../../constants/constants';
import imagePath from '../../../constants/imagePath';
import commonStyles from '../../../themes/commonStyles';
import { RfH, RfW } from '../../../utils';
import ReactionsModal from './ReactionModal';
import styles from './styles';
import moment from 'moment'
import FastImage from 'react-native-fast-image';
export const renderAvatar = (props) => (
    <Avatar
        {...props}
        containerStyle={{
            left: {
                borderWidth: 0,
            }, right: {}
        }}
        imageStyle={{ left: {}, right: {} }}
    />
);



export const renderBubble = (props) => (
    <Bubble
        {...props}
        wrapperStyle={{
            left: {
                backgroundColor: '#B0D0FF',
                borderBottomLeftRadius: 0,
            },
            right: {
                backgroundColor: '#FFFFFF',
                borderBottomRightRadius: 0,
                ...commonStyles.shadowButtonMid,
                shadowOpacity: 0.8,
                shadowRadius: 100,
            },
        }}
        bottomContainerStyle={{
            left: {},
            right: {},
        }}
        tickStyle={{}}
        usernameStyle={{ fontWeight: '100' }}
        containerToNextStyle={{
            left: {},
            right: {},
        }}
        containerToPreviousStyle={{
            left: {},
            right: {},
        }}
    />
);

export const renderSystemMessage = (props) => (
    <SystemMessage
        {...props}
        containerStyle={{ backgroundColor: 'white' }}
        wrapperStyle={{}}
        textStyle={{
            fontFamily: 'Gilroy',
            color: '#000000', fontWeight: '500'
        }}
    />
);


export const renderMessage = (props, onSetReaction) => {

    const renderReactionCount = (currentMessage) => {
        return <View style={{
            right: 30,
            bottom: -15,
            backgroundColor: colors.white,
            paddingHorizontal: RfW(4),
            paddingVertical: RfH(2),
            borderRadius: RfH(8),
            flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center'
        }}>

            {currentMessage?.LOVE ? <Image
                style={styles.emojiStyleChat}
                source={imagePath?.LOVE} /> : null
            }

            {currentMessage?.ANGRY ? <Image
                style={styles.emojiStyleChat}
                source={imagePath?.ANGRY} /> : null}

            {currentMessage?.LIKE ? <Image
                style={styles.emojiStyleChat}
                source={imagePath?.LIKE} /> : null}
            {currentMessage?.HAHA ? <Image
                style={styles.emojiStyleChat}
                source={imagePath?.HAHA} /> : null}
            {currentMessage?.SAD ? <Image
                style={styles.emojiStyleChat}
                source={imagePath?.SAD} /> : null}
            {currentMessage?.WOW ? <Image
                style={styles.emojiStyleChat}
                source={imagePath?.WOW} /> : null}

            {<CustomText
                fontWeight={'600'}
                fontSize={12}
                color={'#918CAF'}>
                {currentMessage?.reactionCount}
            </CustomText>}
        </View>
    }
    return (
        <Message
            {...props}
            renderBubble={({ position, currentMessage }) => {
                if (position == 'right') {
                    return <View
                        style={styles.rightView}>
                        {currentMessage?.text && <CustomText
                            fontWeight={'500'}
                            color={'#000'}
                            styling={{ lineHeight: 24 }}
                        > {currentMessage?.text}</CustomText>}
                        {currentMessage?.images?.[0]?.thumbnail && <FastImage
                            style={{ 
                                borderRadius:RfH(6),
                                height: RfW(100), width: RfW(100) }}
                            source={{ uri:currentMessage?.images?.[0]?.thumbnail }}

                        />}
                        <View style={styles.rightArrow}>
                        </View>
                        <View style={styles.rightArrowOverlap}></View>
                        <View style={styles.rightTimeView}>
                            <CustomText
                                fontWeight={'600'}
                                fontSize={10}
                                color={'#918CAF'}>
                                {moment(currentMessage?.createdAt).fromNow()}
                            </CustomText>
                        </View>

                    </View>
                } else if (position == 'left') {
                    return <>
                        <Pressable
                            onLongPress={() => onSetReaction(true)}
                            style={styles.leftView}>
                            {currentMessage?.text && <CustomText
                                styling={{ lineHeight: 24 }}
                                fontWeight={'500'}
                                color={'#000'}
                            > {currentMessage?.text}</CustomText>}
                            {currentMessage?.images?.[0]?.thumbnail && <FastImage
                                style={{ height: RfW(100), 
                                    borderRadius:RfH(6),
                                    width: RfW(100) }}
                                source={{ uri: currentMessage?.images?.[0]?.thumbnail }}

                            />}
                            <View style={styles.leftArrow}>
                            </View>
                            <View style={styles.leftArrowOverlap}></View>

                        </Pressable>
                        <View style={styles.leftTimeView}>
                            <CustomText
                                fontWeight={'600'}
                                fontSize={10}
                                color={'#918CAF'}>
                                {moment(currentMessage?.createdAt).fromNow()}
                            </CustomText>
                        </View>
                        {currentMessage?.reactionCount ? renderReactionCount(currentMessage) : null}
                    </>
                }

            }
            }
        />
    )
}

export const renderMessageText = (props) => (
    <MessageText
        {...props}
    />
);

export const renderCustomView = ({ user }, props) => {
    return null
}


