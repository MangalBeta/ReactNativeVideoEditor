import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, ImageBackground, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../../components';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import { RfH, RfW, Width } from '../../utils/helpers';
import InlineButtonWrapper from '../InlineButtonWrapper';
import styles from './styles';
const AuthHeader = ({ bgImage, headerArray,bottomLogoImage, 
  CustomeInlineButton={},
  showBottomLogo, title, activeHeaderButton,customeBottomLogoStyle,customeBottomImageStyle={},
  customMainHeadContainer, showCenterLogo = false,
  getActiveButton = null
}) => {
  const navigation = useNavigation()
  const [activeButton, setActiveButton] = useState(activeHeaderButton)
  useEffect(() => {
    if (getActiveButton) {
      getActiveButton(activeButton)

    }
  }, [activeButton])
  return (
    <View style={[styles.mainHeadContainer, customMainHeadContainer]}>
      <StatusBar
        backgroundColor={colors.white}
        barStyle={'light-content'}
      />
      <ImageBackground
        style={styles.imageBgStyle}
        resizeMode={'cover'}
        imageStyle={styles.imageStyle}
        source={bgImage ? bgImage : imagePath?.smallHeaderBgImage}
      >

        <SafeAreaView style={{ flex: 1 }}>

          {/****************** Back Button  *********************/}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              paddingVertical: RfH(8),
              justifyContent: 'flex-start',
              paddingHorizontal: RfW(16)
            }}>
            <Image
              alignSelf={'flex-start'}
              source={imagePath.whiteBackArrow} />
          </TouchableOpacity>



          {/****************** Back Button  *********************/}
          <View style={styles.titleView}>
            <CustomText
              fontSize={28}
              fontWeight='bold'
              color={colors.white}
              styling={{
                letterSpacing: 0.88,
                lineHeight: 32
              }}
            >{title}</CustomText>
          </View>
          {showCenterLogo && <View style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'flex-end', alignItems: 'flex-end'
          }}>
            <Image source={imagePath?.ic_register} />
          </View>}


          {/****************** Back Button  *********************/}
          {headerArray && headerArray.length && <View style={{ paddingTop: RfH(16) }}>
            <InlineButtonWrapper
              customeStyle={{
                height: RfH(36),
                marginBottom: RfH(0),
                ...CustomeInlineButton
              }}
              // activeButton={activeButton}
              buttonsArray={headerArray}
              setActiveButton={(item) => setActiveButton(item)}
            />
          </View>
          }
          {showBottomLogo && <View style={[styles.bottomLogoStyle,customeBottomLogoStyle]}>
            <Image 
            resizeMode='contain'
            style={customeBottomImageStyle}
            source={bottomLogoImage ? bottomLogoImage : imagePath?.ic_verification} />

          </View>}
        </SafeAreaView>

      </ImageBackground>

    </View>


  );
};
export default AuthHeader
