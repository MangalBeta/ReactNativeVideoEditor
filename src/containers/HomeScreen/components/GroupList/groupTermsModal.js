import React, { Fragment } from 'react';
import { Text, ImageBackground, View, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BlurView } from '@react-native-community/blur';
import Modal from 'react-native-modal';

import { useSelector } from 'react-redux';
import colors from '../../../../constants/colors';
import imagePath from '../../../../constants/imagePath';
import commonStyles from '../../../../themes/commonStyles';
import { Height, RfH, RfW, Width } from '../../../../utils';
import styles from './styles';
import { ButtonComponent, CustomText } from '../../../../components';


const GroupTermsModal = ({
    data, isVisible, onCloseActionSheet, modalTitle,onAccept
}) => {

    const renderBackdrop = () => (
        <View style={styles.backdropContainer}>
            <BlurView
                style={{
                    flex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 100,
                }}
                blurType='dark'
                blurAmount={10}
                overlayColor={'rgba(255,255,255,0.8)'}
                blurRadius={100}
                reducedTransparencyFallbackColor="black"
            />
        </View>
    );

    const renderButtons = () => {
        return <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 12,
            marginTop: RfH(32)
        }}>
            <View style={{ flex: 0.1 }} />
            <ButtonComponent
                buttonTitle={'Reject'}
                buttonStyle={{
                    backgroundColor: colors.white,
                    ...styles.shadowBtn
                }}
                buttonTextStyle={{
                    color: '#939393',
                }}
                onPress={() => onCloseActionSheet(false)} />

            <View style={{ flex: 0.1 }} />
            <ButtonComponent
                buttonStyle={styles.shadowBtn}
                buttonTitle={'Accept'}
                onPress={() =>{
                    onAccept()
                    onCloseActionSheet(false)}
                    
                }/>
            <View style={{ flex: 0.1 }} />

        </View>
    }

    return (<Modal
        isVisible={isVisible}
        onSwipeComplete={() => null}
        onBackdropPress={() => null}
        transparent={true}
        backdropColor={'white'}
        backdropOpacity={0.9}
        style={styles.modalBackdrop}
    >
        {renderBackdrop()}

        <TouchableWithoutFeedback
            onPress={() => null}
        >
            <View>
                {renderBackdrop()}
                <View style={{
                    width: '100%',
                    height: Height(),
                    marginTop: Height() / 5,
                    width: Width() - 8,
                }}>
                    <ImageBackground
                        imageStyle={{

                            ...commonStyles.shadowDrawer,
                        }}
                        resizeMode={'contain'}
                        style={{
                            height: '100%',
                            borderColor: 'white',
                            width: Width() - 8,

                        }}
                        source={imagePath?.groupTermsBg}
                    >
                        <View style={styles.topProfileNotch}>
                            <ImageBackground
                                source={{ uri: 'https://picsum.photos/100/100' }}
                                imageStyle={{
                                    borderRadius: RfH(28)
                                }}
                                style={{
                                    height: RfH(68),
                                    width: RfW(68),
                                }}
                                resizeMode={'cover'}
                            >
                            </ImageBackground>

                        </View>
                        <ScrollView style={styles.termsScroll}>
                            <View style={styles.profileTerms}>
                                <CustomText color='#282626'
                                    styling={{
                                        lineHeight: RfH(24)
                                    }}
                                    fontWeight='bold' fontSize={20}>
                                    {'Abhishek'} {'Singh'}
                                </CustomText>
                                <CustomText
                                    color='#282626'
                                    styling={{
                                        lineHeight: RfH(24)
                                    }}
                                    fontSize={13}>
                                    {`@abhishek123`}
                                </CustomText>
                                <View style={styles.breakLine} />
                            </View>

                            <View style={styles.revisedTerms}>
                                <CustomText color='#282626'
                                    styling={{
                                        lineHeight: RfH(24)
                                    }}
                                    fontWeight='700' fontSize={16}>
                                    {'Group Terms & Conditions'}
                                </CustomText>
                                <CustomText
                                    color='#282626'
                                    styling={{
                                        lineHeight: RfH(13)
                                    }}
                                    fontSize={11}>
                                    {`Last Revised: 16 Dec, 20203`}
                                </CustomText>
                                <View style={styles.padd16}>
                                    <CustomText
                                        fontSize={14}
                                        color={'#282626'}
                                        styling={{
                                            textAlign: 'center',
                                            lineHeight: 16
                                        }}
                                    >
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    </CustomText>
                                </View>
                            </View>
                            <View style={[styles.revisedTerms, { paddingVertical: 8 }]}>
                                <CustomText color='#282626'
                                    styling={{
                                        lineHeight: RfH(24)
                                    }}
                                    fontWeight='700' fontSize={16}>
                                    {'Your Agreement'}
                                </CustomText>

                                <View style={styles.padd16}>
                                    <CustomText
                                        fontSize={14}
                                        color={'#282626'}
                                        styling={{
                                            textAlign: 'center',
                                            lineHeight: 17
                                        }}
                                    >
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.                                    </CustomText>
                                </View>
                            </View>
                            <View style={styles.termBtn}>
                                <View
                                    style={{ paddingHorizontal: RfW(8) }}
                                >
                                    <Image
                                        resizeMode='contain'
                                        source={imagePath?.orangeUnCheck} />
                                </View>
                                <CustomText
                                    fontSize={12}
                                >
                                    I agree with the Group
                                </CustomText>
                                <CustomText
                                    color='#4C70FF'
                                    fontWeight='bold'
                                    fontSize={12}
                                >
                                    {` Terms & Conditions`}
                                </CustomText>
                            </View>
                            {renderButtons()}
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View>
        </TouchableWithoutFeedback>

    </Modal>
    );
};
export default React.memo(GroupTermsModal);
