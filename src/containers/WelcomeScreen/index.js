import React, { useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';

import { Image, StatusBar, TouchableOpacity, ImageBackground, View } from 'react-native';
import { CustomText, InlineButtonWrapper } from '../../components';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath'
import styles from './styles';
import strings, { changeLanguageHandler, getSelectedLanguage, localize } from '../../constants/lang/';
import { RfH, RfW ,alertBox} from '../../utils/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../../themes/commonStyles';
import navigationStrings from '../../constants/navigationStrings';
import ActionSheet from '../../components/ActionSheet';

const WelcomeScreen = ({ navigation }) => {
    const bottomViewRef = useRef()
    const centerViewRef = useRef()
    const logoViewRef = useRef()
    const [isShowLanguageOptions, setShowLanguageOptionsFlag] = useState(false);
    const [activeButton, setActiveButton] = useState('Register')
    const [selectedLang,setSelectedLang] = useState('en')
    //Animation Effect
    useEffect(() => {
        if (bottomViewRef?.current) {
            bottomViewRef?.current.slideInUp(1000)
        }
    }, [bottomViewRef?.current])

    useEffect(() => {
        if (centerViewRef?.current) {
            centerViewRef?.current.slideInUp(800)
        }
    }, [centerViewRef?.current])

    // useEffect(() => {
    //     if (logoViewRef?.current) {
    //         logoViewRef?.current.zoomIn(1200);
    //     }
    // }, [logoViewRef?.current])

    const moveToNewScreen =
        (screenName, data = {}) =>
            () => {
                navigation.navigate(screenName, { data });
            };

    const onChangeLanguageHandler = (index,lang) => {
        setShowLanguageOptionsFlag(false);
        setTimeout(() => {
            onChangeLanguageAlert(lang)
        }, 200);
    }

    const changeArabicLanguageHandler = (index,lang) => {
        setShowLanguageOptionsFlag(false);
        const selectedLanguage = getSelectedLanguage()
        setTimeout(() => {
            if (selectedLanguage != 'ar') {
                onChangeLanguage(lang)
                setSelectedLang(lang)
            }
        }, 200);
    }
    const onChangeLanguageAlert = (lang) => {
        alertBox(localize('common.alert'), localize('common.restartMessage'),
        {
            positiveText: localize('common.restartYes'),
            onPositiveClick: () => {
                changeLanguageHandler(lang)
            },
            negativeText: localize('common.restartNo'),
        });  
      };
    
    const [languagesList,setLanguageList] = useState([
        {
            label: localize('login.loginHome.english'),
            handler: onChangeLanguageHandler,
            labelColor: colors.themeColor,
            lang:'en'
        },
        {
            label: localize('login.loginHome.arabic'),
            handler: changeArabicLanguageHandler,
            labelColor: colors.themeColor,
            lang:'ar'
        },
        {
            label: localize('login.loginHome.spanish'),
            handler: onChangeLanguageHandler,
            labelColor: colors.themeColor,
            lang:'es-MX'

        },
        {
            label: localize('login.loginHome.urdu'),
            handler: onChangeLanguageHandler,
            labelColor: colors.themeColor,
            lang:'ur'
        },
    ])
    const onChangeLanguage = (lang) => {
        alertBox(localize('common.alert'), localize('common.restartMessage'),
            {
                positiveText: localize('common.restartYes'),
                onPositiveClick: () => {
                    setSelectedLang(lang)
                    //changeLanguageHandler()
                },
                negativeText: localize('common.restartNo'),
            });
    };
    return (
        <View style={styles.container}>
            <StatusBar
               hidden
                barStyle={'light-content'}
            />
            <ImageBackground
                style={styles.imageBgStyle}
                resizeMode={'cover'}
                source={imagePath?.splashBackground}

            >
                <SafeAreaView style={{ flex: 1 }}>

                    <View style={{
                        alignItems: 'flex-end',
                        paddingTop:RfH(16),
                        paddingHorizontal: RfW(16)
                    }}>
                        <TouchableOpacity

                            onPress={() => setShowLanguageOptionsFlag(true)}
                            style={{
                                borderColor: '#FFFFFF',
                                alignItems: 'center',
                                borderWidth: 2, borderRadius: 20, 
                                height: RfW(36),
                                alignItems: 'center',
                                justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: RfW(10)
                            }}>
                            <Image 
                            style={{
                                width:RfW(18),
                                height:RfH(18)
                            }}
                            source={{uri:'https://cdn3.iconfinder.com/data/icons/finalflags/256/India-Flag.png'}} />

                            <CustomText color={colors.white}
                                fontSize={16} fontWeight={'bold'}
                                styling={{ marginStart: 5 ,marginEnd:5}}  >
                                {'English'}</CustomText>
                            <Image
                                style={{
                                    tintColor:'#FFFFFF'
                                }}
                                source={imagePath?.ic_dropdown}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        ref={logoViewRef}
                        style={{
                            marginVertical: 16,
                            flex: 0.75,
                            justifyContent: 'flex-end', alignItems: 'center'
                        }}>
                        <Image source={imagePath.appLogo} />
                    </View>

                    <Animatable.View
                        ref={centerViewRef}
                        style={styles.secondSection}>
                        <CustomText fontSize={48}
                            color={colors.white}
                            styling={{ letterSpacing: 2 }}
                            fontFamily={'DAGGERSQUARE'}
                        >
                            {localize("welcome.APP_LOGO_TEXT")}
                        </CustomText>
                        <View style={{
                            marginTop: RfH(12),
                            justifyContent: 'center'
                        }}>
                            <CustomText
                                fontSize={14}
                                color={colors.white}
                                fontWeight={'500'}
                                fontFamily={'Gilroy-Medium'}
                                styling={styles.textStylesDesc}
                            >
                                {localize("welcome.APP_LOGO_DESC")}
                            </CustomText>

                            <CustomText
                                fontSize={14}
                                color={colors.white}
                                fontWeight={'500'}
                                fontFamily={'Gilroy-Medium'}
                                styling={styles.textStylesDesc}
                            >
                                {localize("welcome.APP_LOGO_DESC1")}
                            </CustomText>
                        </View>
                        <View style={{
                            marginTop: RfH(36)
                        }}>
                            <CustomText
                                fontSize={16}
                                color={colors.darkYellow}
                                fontWeight={'bold'}
                                styling={{
                                    textAlign: 'center'
                                }}
                            >
                                {localize("welcome.TERMS_PRIVACY")}
                            </CustomText>
                        </View>
                    </Animatable.View>
                    <Animatable.View
                        ref={bottomViewRef}
                    >
                        <InlineButtonWrapper
                            activeButton={activeButton}
                            buttonsArray={['Register', 'Sign in']}
                            setActiveButton={(item) => {
                                if (item == 'Register') {
                                    moveToNewScreen(navigationStrings.SIGN_UP)()
                                } else if (item == 'Sign in') {
                                    moveToNewScreen(navigationStrings.LOGIN)()

                                }
                                setActiveButton(item)
                            }}
                        />
                    </Animatable.View>
                </SafeAreaView>
            </ImageBackground>
            <ActionSheet
                topLabel={localize('login.loginHome.chooseLanguage')}
                actions={languagesList}
                cancelText={localize('common.cancel')}
                handleCancel={() => setShowLanguageOptionsFlag(false)}
                isVisible={isShowLanguageOptions}
                isTopLabelVisible={true}
                selectedLang={selectedLang}
            />
        </View>
    );
};
export default WelcomeScreen
