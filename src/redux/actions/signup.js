import { createRoutine } from 'redux-saga-routines';
import {
    ActionTypes
 } from '../../constants/actions';
const {SIGNUP,LOGIN,SECURITY_QUESTION,FORGOT_PASSWORD}  = ActionTypes;
export const createSignup = createRoutine(SIGNUP);
export const createLogin = createRoutine(LOGIN);
export const createSecurityQuestion = createRoutine(SECURITY_QUESTION);
export const createForgotPassword= createRoutine(FORGOT_PASSWORD);
