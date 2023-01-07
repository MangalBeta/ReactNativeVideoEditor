import React, { useRef, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../../constants/colors';
import { RfH, RfW } from '../../utils/helpers';
import CustomText from '../CustomText';
import styles from './styles'
const InLineHomeTabs = ({ buttonsArray = [], activeButton = {}, setActiveButton, customeStyle }) => {
    const lightSlideRef = useRef([]);


    const onSelectTab = (item, index) => {
        setActiveButton(item)
        // console.log(lightSlideRef,"lightSlideReflightSlideRef")
        // if (lightSlideRef && lightSlideRef?.current) {
        //     lightSlideRef?.current[index].fadeIn(1200)
        // }
    }


    return (
        <View style={[styles.inlineButtonSection, customeStyle]}>
            {buttonsArray && buttonsArray.length && buttonsArray.map((item, index) => {
                return <TouchableOpacity
                    key={index + 'buttoninline'}
                    onPress={() => onSelectTab(item, index)}
                    style={item?.name == activeButton?.name ?
                        [styles.activeButtonStyle, index == 0 && {
                            borderTopLeftRadius: RfH(8),
                            borderBottomLeftRadius: RfH(8),
                        },
                        index == 1 && {
                            borderTopLeftRadius: RfH(0),
                            borderBottomLeftRadius: RfH(0),
                            
                        },
                        index == 2 && {
                            borderTopRightRadius: RfH(8),
                            borderBottomRightRadius: RfH(8),
                        }
                        ] : styles.inActiveButtonStyle}>
                    
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        ref={(el) => (lightSlideRef.current[index] = el)}
                        >
                        <Image source={
                            item?.name == activeButton?.name ?
                                item?.activeImage : item?.inActiveImage
                        }
                        />
                        <CustomText
                            styling={{ paddingHorizontal: RfW(8) }}
                            color={item?.name == activeButton?.name ? colors.black : 'rgba(0,0,0,0.6)'}
                            fontWeight={item?.name == activeButton?.name ? '600' : '600'}
                        >
                            {item?.name}
                        </CustomText>
                    </View>
                </TouchableOpacity>
            })}
        </View>
    );
};
export default React.memo(InLineHomeTabs);
