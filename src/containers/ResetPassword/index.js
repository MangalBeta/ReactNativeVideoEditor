

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthHeader, TextInputWithLabel, CustomText, PhoneNumberInput, SmallButton, ButtonComponent } from '../../components';
import colors from '../../constants/colors';
import navigationStrings from '../../constants/navigationStrings';

import imagePath from '../../constants/imagePath';
import strings, { localize } from '../../constants/lang';
import { RfH, RfW, Height, showError, Width, showSuccess } from '../../utils/helpers';
import styles from './styles';
import validations from '../../utils/validations';
import { api } from '../../utils/api';
import { commonGetCaptcha, commonResetPassword, commonSignup } from '../../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { createForgotPassword, createLogin, createSignup } from '../../redux/actions';
import { createStructuredSelector } from 'reselect';
import { getIdLoginUserSelector, getSignupUserSelector } from '../../redux/selectors/signup';
import { getForgotDataSelector } from '../../redux/selectors/forgotPassword';

const stateSelector = createStructuredSelector({
    user: getSignupUserSelector,
    forgotData: getForgotDataSelector

});
const ResetPassword = ({ navigation ,route}) => {
    const dispatch = useDispatch()
    const { user, forgotData } = useSelector(stateSelector);
    const paramData = route?.params?.data;
    console.log(paramData,"paramDataparamDataparamData")
    const [state, setState] = useState({
        retypePassword: '',
        newPassword: '',
    });
    const updateState = data => setState(state => ({ ...state, ...data }));
    const [captchaText, setCaptchBtnTxt] = useState('')
    const [passValidate, setPasswordValidate] = useState({
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
    })
    const { newPassword, retypePassword } = state
    useEffect(() => {
        getCaptchaApi()
    }, [])


    useEffect(() => {
        validatePassword()
    }, [state?.newPassword])

    const getCaptchaApi = async () => {
        try {
            const resposne = await api({
                method: 'POST',
                url: `${commonGetCaptcha}`,
                data: {}
            });
            if (resposne?.success) {
                const { data } = resposne?.data
                setCaptchBtnTxt(data?.text)
            }
        } catch (error) {
            console.log(error, "errorooor")
            // showError(error)
        }
    }

    const validatePassword = () => {
        setPasswordValidate({
            check1: (newPassword.length > 7) ? true : false,
            check2: /(?=.*[a-z])/.test(newPassword),
            check3: /(?=.*[A-Z])/.test(newPassword),
            check4: /(?=.*[0-9])/.test(newPassword),
            check5: /(?=.*[!{}@#$%^&+=])/.test(newPassword)
        })
    }
    const isValidData = () => {
        let error = validations({
            newPassword: state?.newPassword,
            retypePassword: state?.retypePassword
        });

        if (error) {
            showError(error);
            return;
        }
        return true;
    };
    const moveToNewScreen =
        (screenName, data = {}) =>
            () => {
                navigation.navigate(screenName, { data });
            };


    const onContinuePress = async () => {
                try{
                  Keyboard.dismiss();
                  const checkValid = isValidData();
                  if (!checkValid) {
                    return;
                  } else if(!state?.cache){
                      showError('Please enter captcha')
                  }else if(state?.cache != captchaText){
                    showError('Please enter valid captcha',captchaText)
                  }else {
                    const payload = {}
                    payload['key'] = paramData?.user?._id
                    payload['password'] = newPassword
                    payload['passwordResetToken'] = paramData?.passwordResetToken
                    payload['type'] = 'USER_ID'
                    const resposne = await api({
                        method: 'POST',
                        url: commonResetPassword,
                        data: payload,
                    });
                    if(resposne?.success){
                      navigation.navigate(navigationStrings.LOGIN)
                        showSuccess('Password reset successfully')
                    }else{
                        if (resposne && resposne?.data && resposne?.data?.message) {
                            showError(resposne?.data?.message)
                        }
                    }
                  }
                }catch(error){
            
                }
               
    }

    const checkAllPasswordFiled = () => {
        if (passValidate?.check1 && passValidate?.check2 && passValidate?.check3 && passValidate?.check4 && passValidate?.check5) {
            return true
        } else {
            return false
        }
    }
    const renderValidatePassword = () => {
        return newPassword.length > 0 && !checkAllPasswordFiled() ? <View style={{ paddingTop: RfH(8) }}>
            <CustomText color={passValidate?.check1
                ? colors.successColor
                : colors.dangerColor}>At least 8 characters long</CustomText>
            <CustomText color={passValidate?.check2
                ? colors.successColor
                : colors.dangerColor}>At least 1 lowercase character</CustomText>
            <CustomText color={passValidate?.check3
                ? colors.successColor
                : colors.dangerColor}>At least 1 uppercase character</CustomText>
            <CustomText color={passValidate?.check4
                ? colors.successColor
                : colors.dangerColor}>At least 1 number</CustomText>
            <CustomText color={passValidate?.check5
                ? colors.successColor
                : colors.dangerColor}>At least 1 special character: { }!@#$%^&+=</CustomText>
        </View> : null
    }

    return (
        <View style={{
            flex: 1
        }}>
            <AuthHeader
                title={'Reset Password'}
                showBottomLogo={true}
                customMainHeadContainer={{ flex: 0.65 }}
                  bgImage={imagePath?.bigHeaderBgImage}
                  bottomLogoImage={imagePath?.questionsBg}


            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={styles.keyBoardView}>
                <View style={styles.topView}>
                    <CustomText fontSize={18}
                        fontWeight={'bold'}
                        color={colors.black} styling={{
                            lineHeight: 24,
                            textAlign: 'center'
                        }}>
                        {`Please make your new password`}
                    </CustomText>
                </View>
                <View style={{
                    marginTop: RfH(0)
                }}>

                    <TextInputWithLabel
                        autoCapitalize="none"
                        borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                        inputText={state?.newPassword}
                        labelFocusedStyle={styles.inputFocusedFontSize}
                        labelText={'New Password'}
                        labelTextColor={'rgba(0,0,0,0.5)'}
                        labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
                        maxLength={60}
                        secureTextEntry
                        icEye={true}
                        showClearBtn={true}
                        onChangeText={text => updateState({ newPassword: text })}
                        returnKeyType="default"
                        selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                        textInputContainerStyle={styles.inputTextContainer}
                        textInputStyle={styles.inputTextColor}
                    />
                    {renderValidatePassword()}

                    <TextInputWithLabel
                        autoCapitalize="none"
                        borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                        inputText={state?.retypePassword}
                        labelFocusedStyle={styles.inputFocusedFontSize}
                        labelText={'Retype Password'}
                        labelTextColor={'rgba(0,0,0,0.5)'}
                        labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
                        maxLength={60}
                        secureTextEntry
                        icEye={true}
                        showClearBtn={true}
                        onChangeText={text => updateState({ retypePassword: text })}
                        returnKeyType="default"
                        selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                        textInputContainerStyle={styles.inputTextContainer}
                        textInputStyle={styles.inputTextColor}
                    />

                    <TextInputWithLabel
                        autoCapitalize="none"
                        borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                        inputText={state.cache}
                        labelFocusedStyle={styles.inputFocusedFontSize}
                        labelText={localize('login.ENATER_CACHE')}
                        labelTextColor={'rgba(0,0,0,0.5)'}
                        labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
                        maxLength={60}
                        onChangeText={text => updateState({ cache: text })}
                        returnKeyType="default"
                        selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                        textInputContainerStyle={styles.inputTextContainer}
                        textInputStyle={styles.inputTextColor}
                    />

                </View>
                <View style={[styles.captchaView, {}]}>
                    <TouchableOpacity
                        style={styles.captchaBtnView}
                        onPress={() => alert(1)}>
                        <CustomText
                            color={colors.black}
                            fontWeight={'bold'}
                            fontFamily={'Times'}
                            fontSize={18}
                            styling={{
                                opacity: 0.7,
                                textAlign: 'center',
                                letterSpacing: 9
                            }}>{captchaText ? captchaText : ''}</CustomText>
                    </TouchableOpacity>
                    <View style={styles.cacheIconView}>
                        <Image source={imagePath.ic_catche_1} />
                    </View>
                    <View style={styles.cacheIconView}>
                        <Image source={imagePath.ic_catche_2} />
                    </View>
                    <Pressable
                        onPress={() => getCaptchaApi()}
                        style={styles.cacheIconView}>
                        <Image source={imagePath.ic_catche_3} />
                    </Pressable>
                </View>
                <View style={{ paddingVertical: RfH(26) }}>
                    <ButtonComponent buttonTitle={'Reset'}
                        onPress={() => onContinuePress()} />
                </View>

            </KeyboardAwareScrollView>
        </View>

    );
};
export default ResetPassword
