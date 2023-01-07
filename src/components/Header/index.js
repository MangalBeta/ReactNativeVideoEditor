import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomText } from '../../components';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import { RfH, RfW, Width } from '../../utils/helpers';
import styles from './styles';
const Header = ({ title,
    customMainHeadContainer,
    onBackPress,
    leftImage,
    rightImage,
    rightImage1,
    rightImage2,
    onRightImage2Press,
    isChatHeader = false,
    isRighImageBackground=false
}) => {
    const navigation = useNavigation()
    const { top } = useSafeAreaInsets()

    const rightImageWithImgBackground = () =>{
        return <ImageBackground
        resizeMode='stretch'
        source={imagePath?.rightBg}
        style={{ height: '100%' }}>
        <View style={{
            paddingTop: top,
            flexDirection: 'row',
            alignItems:'center',justifyContent:'center',
            paddingHorizontal: RfW(16)
        }}>
            {rightImage && <TouchableOpacity
                onPress={() => onBackPress ? onBackPress() : navigation.goBack()}>
                <Image
                    resizeMode='contain'
                    source={rightImage} />
            </TouchableOpacity>}
            {rightImage1 && <TouchableOpacity style={{
                paddingLeft: RfW(16)
            }}>
                <Image
                    resizeMode='contain'
                    source={rightImage1} />
            </TouchableOpacity>
            }
        </View>
        {rightImage2 && <TouchableOpacity
            onPress={() => onRightImage2Press()}
            style={{
                paddingLeft: RfW(16)
            }}>
            <Image
                resizeMode='contain'

                source={rightImage2} />
        </TouchableOpacity>

        }
    </ImageBackground>
    }
    return (
        <View style={[styles.container, customMainHeadContainer]}>
            <StatusBar
                backgroundColor={colors.black}
                barStyle={'dark-content'}
            />
            <View style={styles.mainHeadContainer}>
                {/************  LEFT VIEW *************/}
                <View style={{ height: RfH(118), width: RfW(110), }}>
                    <ImageBackground
                        resizeMode='stretch'
                        source={imagePath?.leftBg}
                        style={{ height: '100%' }}>
                        {<TouchableOpacity
                            onPress={() => onBackPress ? onBackPress() : navigation.goBack()}
                            style={{
                                paddingTop: top,
                                paddingHorizontal: RfW(16),
                            }}>
                            <Image
                                resizeMode='contain'
                                source={leftImage ? leftImage : imagePath?.ic_back_black} />
                        </TouchableOpacity>}
                    </ImageBackground>
                </View>



                {/************  CENTER VIEW *************/}

                {title && !isChatHeader && <View style={styles.titleView}>
                    <CustomText
                        fontFamily='DAGGERSQUARE'
                        color={colors.black}
                        styling={{
                            lineHeight: 32,
                            letterSpacing: 0.83
                        }}
                        fontSize={24} fontWeight={'bold'}>
                        {title}
                    </CustomText>

                </View>}

                {/************  RIGHT VIEW *************/}

                <View style={styles.rightView}>
                    {isRighImageBackground && rightImageWithImgBackground()}
                </View>
            </View>
        </View>


    );
};
export default Header
