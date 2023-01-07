import React, { useState } from 'react';
import { Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../constants/colors';
import { RfH, RfW } from '../../utils';
import CustomText from '../CustomText';
import styles from './styles'
import cssStyle from './styles.css'
const InLineButtonWrapper = ({ customeTextStyle = {}, buttonsArray = [], activeButton, setActiveButton, customeStyle, customeActiveStyle }) => {
    return (
        <View style={[styles.inlineButtonSection, customeStyle]}>
            {buttonsArray && buttonsArray.length && buttonsArray.map((item, index) => {
                return item == activeButton ?
                    <Pressable
                        style={[styles.container, cssStyle.buttonMainStyle]}>
                        <LinearGradient
                            style={[styles.button]}
                            start={{
                                x: 0,
                                y: 0.8
                            }}
                            end={{
                                x: 0,
                                y: -0.9
                            }}
                            colors={['#FFFFFF', 'rgba(125, 174, 247, 0.1)']}
                        >
                            <View style={{
                                height: '100%', justifyContent: 'center', alignItems: 'center',
                                borderRadius: RfH(8)
                            }}>
                                <CustomText
                                    color={colors.black}
                                    fontWeight={'600'}
                                    styling={customeTextStyle}
                                >
                                    {item}
                                </CustomText>
                            </View>
                        </LinearGradient>
                    </Pressable>
                    : <TouchableOpacity
                        key={index + 'buttoninline'}
                        onPress={() => setActiveButton(item)}
                        style={[styles.inActiveButtonStyle, customeActiveStyle]}>
                        <CustomText
                            color={item == activeButton ? colors.black : colors.white}
                            fontWeight={'600'}
                            styling={customeTextStyle}
                        >
                            {item}
                        </CustomText>
                    </TouchableOpacity>
            }
            )}
        </View>
    );
};
export default React.memo(InLineButtonWrapper);
{/* <TouchableOpacity
                        key={index + 'buttoninline'}
                        onPress={() => setActiveButton(item)}
                        style={[styles.activeButtonStyle, customeActiveStyle, cssStyle.inlineButtonMainStyle]}>
                        <LinearGradient
                            style={[{
                                flex: 1,
                                width:'100%',
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:RfH(8),
                            }]}
                           
                          
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0.17, y: 0.78 }}
                            locations={[0.0, 0.99]}
                            colors={['#FFFFFF', 'rgba(125, 174, 247,1)']}
                        >
                            <CustomText
                                color={item == activeButton ? colors.black : colors.white}
                                fontWeight={'600'}
                                styling={customeTextStyle}
                            >
                                {item}
                            </CustomText>
                        </LinearGradient>
                    </TouchableOpacity> */}