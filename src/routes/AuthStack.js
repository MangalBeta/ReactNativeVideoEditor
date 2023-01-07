import React from 'react';
import {useSelector} from 'react-redux';
import {
  Signup,
  Login,
  WelcomeScreen,
  Verification,
  SecurityQuestion,
  CommanWebView,
  ForgotPassword,
  AnswerTheQuestion,
  EnterDob,
  ResetPassword
} from '../containers';

import navigationStrings from '../constants/navigationStrings'

export default function (Stack) {
  return (
    <>   
  
      <Stack.Screen
        name={navigationStrings.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{headerShown: false}}
      /> 
        <Stack.Screen
        name={navigationStrings.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{headerShown: false}}
      /> 
        <Stack.Screen
        name={navigationStrings.SIGN_UP}
        component={Signup}
        options={{headerShown: false}}
      /> 
       <Stack.Screen
        name={navigationStrings.OTP_VERIFICATION}
        component={Verification}
        options={{headerShown: false}}
      /> 
        <Stack.Screen
        name={navigationStrings.SECURITY_QUESTION}
        component={SecurityQuestion}
        options={{headerShown: false}}
      /> 
        <Stack.Screen
        name={navigationStrings.SECURITY_QUESTION_ANSWER}
        component={AnswerTheQuestion}
        options={{headerShown: false}}
      /> 
       <Stack.Screen
        name={navigationStrings.ENTER_DOB}
        component={EnterDob}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name={navigationStrings.RESET_PASSWORD}
        component={ResetPassword}
        options={{headerShown: false}}
      /> 
        <Stack.Screen
        name={navigationStrings.COMMAN_WEB_VIEW}
        component={CommanWebView}
        options={{headerShown: false}}
      /> 
     
      
    </>
  );
}
