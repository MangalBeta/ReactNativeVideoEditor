

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthHeader, TextInputWithLabel, CustomText, PhoneNumberInput, SmallButton } from '../../components';
import colors from '../../constants/colors';
import navigationStrings from '../../constants/navigationStrings';

import imagePath from '../../constants/imagePath';
import strings, { localize } from '../../constants/lang';
import { RfH, RfW, Height, showError, Width, showSuccess } from '../../utils/helpers';
import styles from './styles';
import validations from '../../utils/validations';
import { api } from '../../utils/api';
import { commonGetCaptcha, commonSignup } from '../../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { createForgotPassword, createLogin, createSignup } from '../../redux/actions';
import { createStructuredSelector } from 'reselect';
import { getIdLoginUserSelector, getSignupUserSelector } from '../../redux/selectors/signup';
import { getForgotDataSelector} from '../../redux/selectors/forgotPassword';

const stateSelector = createStructuredSelector({
  user: getSignupUserSelector,
  forgotData:getForgotDataSelector

});
const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user ,forgotData} = useSelector(stateSelector);

  const paramData = navigation?.route?.params?.data;
  const [state, setState] = useState({
    isLoading: false,
    callingCode: paramData?.callingCode ? paramData?.callingCode : '91',
    cca2: paramData?.cca2 ? paramData?.cca2 : 'IN',
    phoneNumber: paramData?.phoneNumber || '',
    otp: '',
    otpToShow: '',
    otpPrefilled: false,
    email: paramData?.email || ''
  });
  const updateState = data => setState(state => ({ ...state, ...data }));
  const [activeButton, setActiveButton] = useState('Mobile')
  const { phoneNumber, cca2, callingCode, isLoading } = state;
  const [captchaText, setCaptchBtnTxt] = useState('')
  useEffect(() => {
    getCaptchaApi()
  }, [])
  useEffect(() => {
    if (forgotData?.Otp) {
      navigation.navigate(navigationStrings.OTP_VERIFICATION, {
        data: { ...state, activeType: 
          activeButton == 'Mobile' ? 'PHONE_NUMBER' : 'EMAIL',
          key:getKeyButtonValue(),
          type:getTypeButton(),
          fromResetPassword:true
        }
      })
    }
  }, [forgotData])
  //On country change
  const _onCountryChange = data => {
    updateState({ cca2: data.cca2, callingCode: data.callingCode[0] });
    return;
  };

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
  const isValidData = () => {
    let error
    if(activeButton == 'Email ID'){
       error = validations({
        email: state?.email,
        password: state?.password,
      });
    }else if(activeButton == 'Mobile'){
       error = validations({
        phoneNumber: state?.phoneNumber,
        password: state?.password,
      });
    }
    else if(activeButton == 'Username'){
      error = validations({
       phoneNumber: state?.username,
       password: state?.password,
     });
   }
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

      const getTypeButton = ()=>{
        if(activeButton == 'Email ID'){
          return "EMAIL"
        }
        if(activeButton == 'Mobile'){
          return "PHONE_NUMBER"
        }
        if(activeButton == 'Username'){
          return "USERNAME"
        }
      }
      const getKeyButtonValue = ()=>{
        if(activeButton == 'Email ID'){
          return state?.email
        }
        if(activeButton == 'Mobile'){
          return state?.phoneNumber
        }
        if(activeButton == 'Username'){
          return state?.username
        }
      }


  const onContinuePress = () => {
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
      payload['key'] = getKeyButtonValue()
      payload['countryCode'] = callingCode
      payload['dialCode'] = callingCode
      payload['phoneNo'] = state?.phoneNumber
      payload['type'] = getTypeButton()
      dispatch(createForgotPassword.trigger(payload))
    }
  }
  return (
    <View style={{
      flex: 1
    }}>
      <AuthHeader
        bgImage={imagePath?.bigHeaderBgImage}
        title={'Forgot Password'}
        showCenterLogo={false}
        showBottomLogo={true}
        bottomLogoImage={imagePath?.forgotBg}
        customeBottomLogoStyle={{
          bottom: -RfH(48), right: -RfW(32), zIndex: -1
        }}
        CustomeInlineButton={{
          top:RfH(125)
        }}
        getActiveButton={(activeButton) => setActiveButton(activeButton)}

        activeHeaderButton={activeButton}
        headerArray={[ 'Mobile','Email ID','Username']}
        customMainHeadContainer={{ flex: 0.9 }}
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
            {activeButton == 'Email ID' ? 'Enter your Email' : 'Enter your Mobile Number'}
          </CustomText>
          <View style={{ height: RfH(4) }} />
          <CustomText fontSize={13}
            fontWeight={'500'}
            color={colors.black} styling={{
              lineHeight: 18,
              textAlign: 'center', opacity: 0.6
            }}>
            {activeButton == 'Email ID' ? 'Please enter  your email address' : 'Please confirm your country code and enter your mobile number'}

          </CustomText>
        </View>
        <View style={{
          marginTop: RfH(0)
        }}>
            {activeButton == 'Username' && <TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state?.username}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize('login.ENATER_USERNAME')}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            onChangeText={text => updateState({ username: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />
          }
          {activeButton == 'Email ID' && <TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state.email}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize('login.EMAIL_ID')}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            onChangeText={text => updateState({ email: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />
          }
          {activeButton == 'Mobile' && <><PhoneNumberInput
            onCountryChange={_onCountryChange}
            onChangePhone={phoneNumber =>
              updateState({ phoneNumber: phoneNumber.replace(/[^0-9]/g, '') })
            }
            cca2={cca2}
            label={localize('login.MOBILE_NUMBER')}
            phoneNumber={phoneNumber}
            callingCode={state.callingCode}
            placeholder={localize('login.YOUR_PHONE_NUMBER')}
            keyboardType={'phone-pad'}
            returnKeyType={'done'}
            color={colors.textGreyOpcaity7}
            borderColor={colors.themeColor}
            callingCodeTextStyle={styles.callingCodeTextStyle}
            labelStyle={{
              fontWeight: 'bold',
              opacity: 0.5,
              fontSize: 12
            }}
          />
          </>}

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

        <View style={styles.alreadyTextContainer}>
          <View style={styles.alreadytextView}>
            <CustomText
              fontSize={14}
              styling={{
                lineHeight: 20
              }}>
              {localize("signup.ALREADY_HAVE_AN_ACCOUNT")}
            </CustomText>
            <View style={{ height: RfH(4) }} />
            <TouchableOpacity onPress={() => moveToNewScreen(navigationStrings.LOGIN)()}>
              <CustomText
                fontSize={14}

                color={colors.themeColor} fontWeight={'bold'} >
                {localize("login.LOGIN")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <SmallButton
            buttonTitle={localize("login.SIGNIN")}
            onPress={() => onContinuePress()}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>

  );
};
export default ForgotPassword
