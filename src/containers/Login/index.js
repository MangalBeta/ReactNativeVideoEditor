

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ButtonComponent, AuthHeader, TextInputWithLabel, CustomText, PhoneNumberInput } from '../../components';
import colors from '../../constants/colors';
import navigationStrings from '../../constants/navigationStrings';

import imagePath from '../../constants/imagePath';
import strings, { localize } from '../../constants/lang';
import { RfH, RfW,Height, showError, showSuccess } from '../../utils/helpers';
import styles from './styles';
import validations from '../../utils/validations';
import { api } from '../../utils/api';
import { commonGetCaptcha, commonSignup } from '../../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { createLogin, createSignup } from '../../redux/actions';
import { createStructuredSelector } from 'reselect';
import { getIdLoginUserSelector, getSignupUserSelector } from '../../redux/selectors/signup';

const stateSelector = createStructuredSelector({
  user: getSignupUserSelector,
  isLoggedIn: getIdLoginUserSelector,

});
const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user,isLoggedIn } = useSelector(stateSelector);

  const [state, setState] = useState({
    email: '',
    password: '',
    cache: null,
    callingCode: '91',
    cca2: 'IN',
    phoneNumber: '',
    username: ''
  })


  useEffect(() => {
    getCaptchaApi()
  }, [])




  const updateState = data => setState(state => ({ ...state, ...data }));
  const [activeButton, setActiveButton] = useState('Email ID')
  const { phoneNumber, cca2, callingCode, isLoading } = state;
  const [captchaText, setCaptchBtnTxt] = useState('')
  //On country change
  const _onCountryChange = data => {
    updateState({ cca2: data.cca2, callingCode: data.callingCode[0] });
    return;
  };


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

  const onLogin = () => {
    Keyboard.dismiss();
    console.log(state?.catch, "!=", captchaText)
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    } else if(!state?.cache){
        showError('Please enter captcha')
    }else if(state?.cache != captchaText){
      showError('Please enter valid captcha',captchaText)
    }else {
      const payload = {}
      payload['password'] = state?.password
      payload['key'] =getKeyButtonValue()
      payload['role'] = 'F'
      payload['deviceType'] = Platform.OS.toUpperCase()
      payload['type'] = getTypeButton()
      dispatch(createLogin.trigger(payload))
    }
  }

  return (
    <View style={{
      flex: 1
    }}>
      <AuthHeader
      customMainHeadContainer={{
        height:Platform.OS == 'android' ? Height()/4:Height()/3.5
      }}
        headerArray={['Username', 'Email ID', 'Mobile']}
        activeHeaderButton={activeButton}
        title={'LOGIN'}
        getActiveButton={(activeButton) => setActiveButton(activeButton)}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardView}>
        <View style={{
          marginTop: RfH(24)
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
            inputText={state.password}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize('login.PASSWORD')}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            onChangeText={text => updateState({ password: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
            secureTextEntry
            icEye={true}
            showClearBtn={true}
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


        <View style={[styles.forgotView, {}]}>
          <TouchableOpacity onPress={() => moveToNewScreen(navigationStrings.FORGOT_PASSWORD)()}>
            <CustomText
              color={colors.shadowColor}
              fontWeight={'bold'}
              fontSize={14}
              styling={styles.signUpText}>{localize("login.FORGOT_PASSWORD")}</CustomText>
          </TouchableOpacity>
        </View>

        <View style={{ paddingVertical: RfH(20) }}>
          <ButtonComponent buttonTitle={localize("login.SIGNIN")}
            onPress={() => onLogin()} />
        </View>

        <View style={[styles.signUpView, { flexDirection: 'row' }]}>
          <CustomText
            styling={styles.byContinue}>
            {localize("login.DONT_HAVE_ACCOUNT")}{' '}
          </CustomText>
          <TouchableOpacity onPress={() => moveToNewScreen(navigationStrings.SIGN_UP,{
            activeType: activeButton == 'Mobile' ? 'PHONE_NUMBER' : 'EMAIL'
          })()}>
            <CustomText
              color={colors.shadowColor}
              fontWeight={'bold'}
              styling={styles.signUpText}>{localize("signup.REGISTER")}</CustomText>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>

  );
};
export default Login
