import React, { useEffect, useState } from 'react';
import { StyleSheet, Keyboard,Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CustomText, AuthHeader, PhoneNumberInput, SmallButton } from '../../components';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import styles from './styles';
import strings, { localize } from '../../constants/lang/';
import { RfH, RfW, showError, showSuccess, Width } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigationStrings from '../../constants/navigationStrings';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import validations from '../../utils/validations';
import { createForgotPassword, submitOtpVerify } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getSignupUserSelector } from '../../redux/selectors/signup';
import { getVerificationserSelector, getVerificationsIsVerifiedSelector } from '../../redux/selectors/verification';
import { api } from '../../utils/api';
import { commonForgotPassword, commonVerifyResetOTP } from '../../utils/url';


const stateSelector = createStructuredSelector({
  user: getVerificationserSelector,
  IsVerified:getVerificationsIsVerifiedSelector
});
const Verification = ({ navigation ,route}) => {
  const paramData = route?.params?.data;
  const { user,IsVerified } = useSelector(stateSelector);
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLoading: false,
    callingCode: paramData?.callingCode ? paramData?.callingCode : '91',
    cca2: paramData?.cca2 ? paramData?.cca2 : 'IN',
    phoneNumber: paramData?.phoneNumber || '999939399393939',
    otp: '',
    otpToShow: '',
    otpPrefilled: false,
    email:paramData?.email || '',
    type:paramData?.type,
    key:paramData?.key,
    
  });

  useEffect(()=>{
    return resetForgotStore()
  },[])

  const  resetForgotStore = () =>{
    dispatch(createForgotPassword.success(null))
  }
  useEffect(()=>{
    if(IsVerified && user?.accessToken){
      moveToNewScreen(navigationStrings.SECURITY_QUESTION)()
    }
  },[IsVerified || user])
  const updateState = data => setState(state => ({ ...state, ...data }));


  const moveToNewScreen =
    (screenName, data = {}) =>
      () => {
        navigation.navigate(screenName, { data });
      };
  const onOtpInput = code => {
    updateState({
      isLoading: true,
      otp: code,
      otpPrefilled: true,
    });
  };


  const isValidData = () => {
    const error = validations({
      otp: state?.otp,
    });
    if (error) {
      showError(error);
      return;
    }
    return true;
  };


  const onSubmitOtp = ()=>{
    Keyboard.dismiss();
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }else{
      if(paramData?.fromResetPassword){
        verifyResetOTP()
      }else{
        const payload ={}
        payload['OTP'] = state?.otp
        payload['phone'] = state?.phoneNumber
        payload['email'] = state?.email
        payload['role'] = "F"
        dispatch(submitOtpVerify.trigger(payload));
      }
    }
  }

  const resendOTP = async () => {
    try {
        let payload = {}
        payload['key'] = state?.key 
        payload['type'] = state?.type 
        const resposne = await api({
            method: 'POST',
            url: commonVerifyResetOTP,
            data: payload,
        });
        if (resposne.success == true) {
          showSuccess('OTP matched successfully')
        } else {
            if (resposne && resposne?.data && resposne?.data?.message) {
                showError(resposne?.data?.message)
            }
        }
    } catch (error) {
        console.log(error, "eeeeee")

    }
}

const verifyResetOTP = async () => {
  try {
  
      let payload = {}
      payload['key'] = state?.key 
      payload['type'] = state?.type 
      payload['OTP'] = state?.otp 
      const resposne = await api({
          method: 'PUT',
          url: commonVerifyResetOTP,
          data: payload,
      });
      if (resposne.success == true) {
         moveToNewScreen(navigationStrings.SECURITY_QUESTION_ANSWER,{
            data:resposne?.data?.data
         })()
      } else {
          if (resposne && resposne?.data && resposne?.data?.message) {
              showError(resposne?.data?.message)
          }
      }

  } catch (error) {
      console.log(error, "eeeeee")

  }
}


  const {
    otp,
    otpToShow,
    otpPrefilled,
  } = state;
  return (
    <View style={{ flex: 1 }}>
      <AuthHeader
        bgImage={imagePath?.bigHeaderBgImage}
        title={localize("otp.VERIFICATION")}
        showCenterLogo={false}
        showBottomLogo={true}
        customMainHeadContainer={{ flex: 0.8 }}
      />
      <View style={{ height: RfH(32) }} />
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
            {paramData?.activeType == 'EMAIL' ?   localize("otp.VERIFY_EMAIL"): localize("otp.VERIFY_MOBILE_NUMBER")}
          </CustomText>
          <View style={{ height: RfH(4) }} />

          <CustomText fontSize={13}
            fontWeight={'500'}
            color={colors.black} styling={{
              lineHeight: 18,
              textAlign: 'center', opacity: 0.6
            }}>
            {paramData?.activeType == 'EMAIL' ? localize("otp.VERIFY_EMAIL_DESC") : localize("otp.VERIFY_MOBILE_NUMBER_DESC")}
        
          </CustomText>
          <CustomText fontSize={13}
            fontWeight={'500'}
            color={colors.black} styling={{
              lineHeight: 18,
              textAlign: 'center', opacity: 0.6
            }}>
            {paramData?.activeType == 'EMAIL' && state?.email}
            {paramData?.activeType == 'PHONE_NUMBER' && state?.callingCode} {state?.phoneNumber} 
            
          </CustomText>
        </View>
        <View style={styles.phoneInputView}>
        <SmoothPinCodeInput
          containerStyle={{alignSelf: 'center'}}
          password
          autoFocus={true}
          mask={<View style={styles.maskStyle} />}
          cellSize={Width() / 5.5}
          codeLength={4}
          cellSpacing={16}
          editable={true}
          cellStyle={styles.cellStyle}
          cellStyleFocused={styles.cellStyleFocused}
          textStyle={styles.textStyleCodeInput}
          textStyleFocused={styles.textStyleFocused}
          inputProps={{
            autoCapitalize: 'none',
            autoFocus: true,
          }}
          value={otpToShow}
          keyboardType={'numeric'}
          onTextChange={otpToShow => updateState({otpToShow})}
          onFulfill={code => onOtpInput(code)}
        />
        </View>
        <View style={styles.alreadyTextContainer}>
          <View style={styles.alreadytextView}>
            <TouchableOpacity
            style={{
              justifyContent:'center'
            }}
            onPress={() => resendOTP()}>
              <CustomText
                fontSize={16}
            
                color={colors.themeColor} fontWeight={'bold'} >
                {localize("otp.RESEND_CODE")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <SmallButton
        
           onPress={() => onSubmitOtp()}
            />
        
        </View>
      </KeyboardAwareScrollView>
    </View>

  );
};
export default Verification
