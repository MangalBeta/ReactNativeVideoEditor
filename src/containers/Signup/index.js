import React, { useEffect, useState } from 'react';
import { StyleSheet, Keyboard, Pressable, Image, View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { CustomText, AuthHeader, PhoneNumberInput, TextInputWithLabel, SmallButton } from '../../components';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import styles from './styles';
import strings, { localize } from '../../constants/lang/';
import { RfH, RfW, showError, Height } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigationStrings from '../../constants/navigationStrings';
import validations from '../../utils/validations'
import { useDispatch, useSelector } from 'react-redux';
import { createSignup } from '../../redux/actions/signup';
import { getSignupUserSelector } from '../../redux/selectors/signup';
import { createStructuredSelector } from 'reselect';
import cssStye from './styles.css'
import { LinearGradient } from 'expo-linear-gradient';


const stateSelector = createStructuredSelector({
  user: getSignupUserSelector,

});
const Signup = ({ navigation }) => {

  const { user } = useSelector(stateSelector);
  const dispatch = useDispatch()
  const [state, setState] = useState({
    callingCode: '91',
    cca2: 'IN',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    password: '',
    isTermsConditions: ''
  });
  const [passValidate, setPasswordValidate] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,

  })
  const [activeButton, setActiveButton] = useState('Mobile')
  const [isDatePickOpen, setIsDatePickOpen] = useState(false)
  const { phoneNumber, isTermsConditions, cca2, callingCode, password, confirmPassword, firstName, lastName } = state;

  const validatePassword = () => {
    setPasswordValidate({
      check1: (password.length > 7) ? true : false,
      check2: /(?=.*[a-z])/.test(password),
      check3: /(?=.*[A-Z])/.test(password),
      check4: /(?=.*[0-9])/.test(password),
      check5: /(?=.*[!{}@#$%^&+=])/.test(password)
    })
  }

  useEffect(() => {
    if (user?.Otp) {
      navigation.navigate(navigationStrings.OTP_VERIFICATION, {
        data: { ...state, activeType: activeButton == 'Mobile' ? 'PHONE_NUMBER' : 'EMAIL' }
      })
    }
  }, [user])


  useEffect(() => {
    validatePassword()
  }, [state?.password])


  const updateState = data => setState(state => ({ ...state, ...data }));
  //On country change
  const _onCountryChange = data => {
    updateState({ cca2: data.cca2, callingCode: data.callingCode[0] });
    return;
  }



  const isValidData = () => {
    let validateObj = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword,
      email: state?.email,
      phoneNumber: phoneNumber
    }
    //   if(activeButton == 'Email ID'){
    //     validateObj['email'] =state?.email

    //  }else if(activeButton == 'Mobile'){
    //   validateObj['phoneNumber'] = phoneNumber
    //  }
    const error = validations(validateObj);
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  const getKeyButtonValue = () => {
    if (activeButton == 'Email ID') {
      return state?.email
    }
    if (activeButton == 'Mobile') {
      return state?.phoneNumber
    }

  }
  const getTypeButton = () => {
    if (activeButton == 'Email ID') {
      return "EMAIL"
    }
    if (activeButton == 'Mobile') {
      return "PHONE_NUMBER"
    }
    if (activeButton == 'Username') {
      return "USERNAME"
    }
  }

  const onContinuePress = () => {
    Keyboard.dismiss();
    const checkValid = isValidData();
    if (!isTermsConditions) {
      return showError("Please select Terms and condtion first.")
    }
    if (!checkValid) {
      return;
    } else if (!state?.dob) {
      showError(localize("validation.SELECT_DOB"))
    }
    else {
      const payload = {}
      payload['firstName'] = firstName
      payload['lastName'] = lastName
      payload['password'] = password
      // payload['key'] = getKeyButtonValue()
      payload['email'] = state?.email
      payload['phone'] = phoneNumber
      payload['dob'] = new Date(state?.dob).getTime().toString()
      payload['role'] = 'F'
      payload['deviceType'] = Platform.OS.toUpperCase()
      // payload['type'] = getTypeButton()
      dispatch(createSignup.trigger(payload));
    }
  }

  const checkAllPasswordFiled = () => {
    if (passValidate?.check1 && passValidate?.check2 && passValidate?.check3 && passValidate?.check4 && passValidate?.check5) {
      return true
    } else {
      return false
    }
  }

  const onPressLink = (title, url) => {
    moveToNewScreen(navigationStrings.COMMAN_WEB_VIEW, {
      webUrl: url,
      headerTitle: title
    })()
  }

 const moveToNewScreen =
    (screenName, data = {}) =>
      () => {
        navigation.navigate(screenName, { data });
      };
  const renderTopViewText = () => {
    return <View style={styles.topView}>
      <CustomText fontSize={18}
        fontWeight={'bold'}
        color={colors.black} styling={{
          lineHeight: 24,
          textAlign: 'center'
        }}>
        {activeButton == 'Email ID' ? localize("signup.NORMAL_USER") : localize("signup.NORMAL_USER")}
      </CustomText>
      <View style={{ height: RfH(4) }} />
      <CustomText fontSize={13}
        fontWeight={'500'}
        color={colors.black}
        styling={{
          lineHeight: 18,
          textAlign: 'center', opacity: 0.6
        }}>
        {activeButton == 'Email ID' ? localize("signup.NORMAL_USER_DESC") : localize("signup.NORMAL_USER_DESC")}
      </CustomText>
    </View>

  }
  const renderValidatePassword = () => {
    return password.length > 0 && !checkAllPasswordFiled() ? <View style={{ paddingTop: RfH(8) }}>
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

  const TermsAndCondtionCheckBox = () => {
    return <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: RfH(16),
      }}>
      <TouchableOpacity
        onPress={() =>
          updateState({ isTermsConditions: !isTermsConditions })
        }>
        <Image
          source={
            isTermsConditions ? imagePath.ic_check : imagePath.ic_unchek
          }
        />
      </TouchableOpacity>
      <CustomText
        color={'black'}
        fontWeight='bold'
      >
        {' I accept the'}
      </CustomText>
      <Pressable
        activeOpacity={0.7}
        onPress={() => onPressLink('Terms & Conditions', 'https://fivvia.com/terms-and-conditions')}>
        <CustomText
          color={'#1975fe'}
          fontWeight={'bold'}
        >
          {` Terms & Conditions`}
        </CustomText>
      </Pressable>
      <CustomText
        color={'black'}
        fontWeight={'bold'}

      >
        {' and'}

      </CustomText>
      <Pressable
        onPress={() => onPressLink('Privacy Policy', 'https://fivvia.com/privacy-policy')}
      >
        <CustomText
          color={'#1975fe'}
          fontWeight={'bold'}
        >
          {' Privacy Policy'}
        </CustomText>
      </Pressable>
    </View>
  }
  return (
    <View style={{ flex: 1 }}>
      <AuthHeader

        // bgImage={imagePath?.bigHeaderBgImage}
        // headerArray={['Mobile', 'Email ID']}
        customMainHeadContainer={{
          height: Platform.OS == 'android' ? Height() / 6 : Height() / 5
        }}
        activeHeaderButton={activeButton}
        title={'Registeration'}
        // showCenterLogo={true}
        getActiveButton={(activeButton) => setActiveButton(activeButton)}
      />
      <View style={{ height: RfH(16) }} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardView}>
        {renderTopViewText()}
        <View style={styles.phoneInputView}>
          <TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state?.firstName}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize("signup.FIRSTNAME")}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            onChangeText={text => updateState({ firstName: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />
          <TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state?.lastName}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize("signup.LASTNAME")}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            onChangeText={text => updateState({ lastName: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />

          {<TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state.email}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize("signup.EMAIl_ID")}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            onChangeText={text => updateState({ email: text })}
            returnKeyType="email-address"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />}
          {<>
            <View style={{ height: RfH(16) }} />
            <PhoneNumberInput
              onCountryChange={_onCountryChange}
              onChangePhone={phoneNumber =>
                updateState({ phoneNumber: phoneNumber.replace(/[^0-9]/g, '') })
              }
              cca2={cca2}
              label={localize("signup.MOBILE_NUMBER")}
              phoneNumber={phoneNumber}
              callingCode={state.callingCode}
              placeholder={localize("signup.YOUR_PHONE_NUMBER")}
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
          </>
          }
          <TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state?.password}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize("signup.PASSWORD")}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            secureTextEntry
            icEye={true}
            showClearBtn={true}
            onChangeText={text => updateState({ password: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />
          {renderValidatePassword()}

          <TextInputWithLabel
            autoCapitalize="none"
            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            inputText={state?.confirmPassword}
            labelFocusedStyle={styles.inputFocusedFontSize}
            labelText={localize("signup.CONFIRM_PASSWORD")}
            labelTextColor={'rgba(0,0,0,0.5)'}
            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
            maxLength={60}
            secureTextEntry
            icEye={true}
            showClearBtn={true}
            onChangeText={text => updateState({ confirmPassword: text })}
            returnKeyType="default"
            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
            textInputContainerStyle={styles.inputTextContainer}
            textInputStyle={styles.inputTextColor}
          />

          <Pressable onPress={() => setIsDatePickOpen(true)}>
            <TextInputWithLabel
              autoCapitalize="none"
              borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
              inputText={state?.dob ? moment(state?.dob).format('DD/MM/YYYY') : ''}
              labelFocusedStyle={styles.inputFocusedFontSize}
              labelText={localize("signup.DOB")}
              labelTextColor={'rgba(0,0,0,0.5)'}
              labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
              maxLength={60}
              editable={false}
              onChangeText={text => updateState({ dob: text })}
              returnKeyType="default"
              selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
              textInputContainerStyle={styles.inputTextContainer}
              textInputStyle={styles.inputTextColor}
            />
          </Pressable>
        </View>
        <TermsAndCondtionCheckBox />
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

        <View style={{ height: RfH(16) }} />

        {<DatePicker
          modal
          mode='date'
          open={isDatePickOpen}
          date={new Date()}
          maximumDate={new Date()}
          onConfirm={(date) => {
            setIsDatePickOpen(false)
            updateState({ dob: date })
          }}
          onCancel={() => {
            setIsDatePickOpen(false)
          }}
        />}
      </KeyboardAwareScrollView>
    </View>

  );
};
export default Signup
