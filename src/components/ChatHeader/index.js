import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';

import { StatusBar, TouchableOpacity, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    isChatHeader=false,
    subTitle=null,
    profileImage='',
    userTyping=null
}) => {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, customMainHeadContainer]}>
            <StatusBar
                backgroundColor={colors.black}
                barStyle={'dark-content'}
            />
            <View style={styles.mainHeadContainer}>
                
             {/************  LEFT VIEW *************/}
                {<TouchableOpacity
                    onPress={() => onBackPress ? onBackPress() : navigation.goBack()}
                    style={{
                        justifyContent: 'center',
                        flex:0.1,
                    }}>
                    <Image
                        resizeMode='contain'
                        style={{ alignSelf: 'center' }}
                        source={leftImage ? leftImage : imagePath?.ic_back_black} />
                </TouchableOpacity>}

            {/************  CENTER VIEW *************/}

                {title && !isChatHeader && <View style={styles.titleView}>
                     <CustomText
                        fontFamily='DAGGERSQUARE'
                        color={colors.black}
                        styling={{
                            lineHeight: 32,
                            letterSpacing:0.83
                        }}
                        fontSize={24} fontWeight={'bold'}>
                        {title}
                    </CustomText>

                </View>}

                
                {title && isChatHeader && <View style={[{
                    flexDirection:'row',
                    flex:0.58   ,
                    alignItems:'flex-start',
                }]}>
                     
                   

            <View style={styles.chatAvtarView}>
                <FastImage
                    style={styles.chatAvtarImage}
                    source={{ uri: profileImage }}
                    resizeMode={'cover'}
                />
                </View>
                <View style={styles.paddChat}>

                     <CustomText
                        color={colors.black}
                        styling={{
                            lineHeight: 16,
                        }}
                        fontSize={14} fontWeight={'bold'}>
                        {title}
                    </CustomText>
                   {subTitle && <CustomText
                        color={colors.black}
                        styling={{
                            lineHeight: 16,
                        }}
                        fontSize={11}>
                        {subTitle}
                    </CustomText>}
                    {userTyping && <Animatable.Text
                     animation="pulse" easing="ease-out"
                     direction="alternate"
                     iterationCount="infinite"
                      style={{ textAlign: 'center',
                        color:'#272727',
                        fontSize:11,
                        lineHeight: 16,
                      }}>
                        {`Typing...`}
                     </Animatable.Text>}
                    </View>
                    
                </View>}



                {/************  RIGHT VIEW *************/}
                <View style={styles.rightView}>
                    {rightImage && <TouchableOpacity>
                        <Image
                            resizeMode='contain'
                            style={{ alignSelf: 'center' }}
                            source={rightImage} />
                    </TouchableOpacity>

                    }
                    {rightImage1 && <TouchableOpacity style={{
                        paddingLeft:RfW(16)
                    }}>
                        <Image
                            resizeMode='contain'
                            style={{ alignSelf: 'center' }}
                            source={rightImage1} />
                    </TouchableOpacity>
                    }
                    {rightImage2 && <TouchableOpacity 
                        onPress={()=>onRightImage2Press()}
                        style={{
                        paddingLeft:RfW(16)
                    }}>
                        <Image
                            resizeMode='contain'
                            style={{ alignSelf: 'center' }}
                            source={rightImage2} />
                    </TouchableOpacity>
                    }
                </View>
            </View>
        </View>


    );
};
export default Header
