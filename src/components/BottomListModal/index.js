import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { RfW, RfH } from '../../utils/helpers';
import { CustomText } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import imagePath from '../../constants/imagePath';
import colors from '../../constants/colors';
import ButtonComponent from '../ButtonComponent';
import { localize } from '../../constants/lang';

const BottomSignupModal = ({ openModal, setOpenModal, modalProps, onSelectData, selectedData }) => {
    return (
        <Modal animationType="fade" onBack visible={openModal} transparent>
            <View

                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                }}>
                <View
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <View
                        style={{
                            height: '70%',
                            backgroundColor: 'white',
                            borderTopRightRadius: RfW(24),
                            borderTopLeftRadius: RfW(24),
                        }}>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                borderColor: 'rgba(0,0,0,0.1)',
                                alignItems: 'center',
                                paddingHorizontal: RfW(16),
                                justifyContent: 'space-between',
                                paddingVertical: RfH(16),
                            }}>
                            <View style={{ flex: 1 }}>
                                <CustomText
                                    styling={{
                                        textAlign: 'center'
                                    }}
                                    fontSize={18} fontWeight={'bold'}>
                                    {modalProps?.label}
                                </CustomText>
                            </View>

                            <CustomText fontSize={16}
                                color={colors.themeColor}
                                fontWeight={'600'}>
                                {"Close"}
                            </CustomText>
                        </View>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={modalProps?.data}
                                bounces={false}
                                ItemSeparatorComponent={() => {
                                    return (
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: '#C8C8C8',
                                                opacity: 0.4,
                                            }}
                                        />
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Pressable
                                            onPress={() => onSelectData(item)}
                                            key={'inx' + index + 'profile'}
                                            style={{
                                                flexDirection: 'row',
                                                paddingVertical: RfH(16),
                                                justifyContent: 'space-between',
                                                paddingHorizontal: RfW(16),
                                                alignItems: 'center'
                                            }}>

                                            <View style={{
                                                justifyContent: 'center',
                                                paddingHorizontal: RfW(8)
                                            }}>

                                                {item?.profilePicURL?.thumbnail ? <Image
                                                    style={{
                                                        height: RfW(40), width: RfW(40),
                                                        borderRadius: RfW(40) / 2
                                                    }}
                                                    source={{ uri: item?.profilePicURL?.thumbnail }} />
                                                    : <View style={{
                                                        height: RfW(40), width: RfW(40),
                                                        borderRadius: RfW(40) / 2,
                                                        backgroundColor: colors.themeColor,
                                                        justifyContent: 'center', alignItems: 'center'
                                                    }}>
                                                        <CustomText
                                                            color='white'
                                                            fontSize={18}
                                                        >
                                                            {item?.firstName.substring(0, 1).toUpperCase()}  {item?.lastName.substring(0, 1).toUpperCase()}
                                                        </CustomText>

                                                    </View>
                                                }
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                paddingHorizontal: RfW(16)
                                            }}>
                                                <CustomText fontWeight='600'>
                                                    {item?.firstName} {item?.lastName}
                                                </CustomText>
                                                <CustomText>
                                                    {item?.userName}
                                                </CustomText>
                                            </View>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingRight: RfW(8)
                                            }}>
                                                <Image source={item?._id == selectedData?._id ? imagePath?.ic_radio_active : imagePath?.ic_radio} />
                                            </View>
                                        </Pressable>
                                    );
                                }}
                            />
                        </View>
                    
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default BottomSignupModal