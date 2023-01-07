import { createRoutine } from 'redux-saga-routines';
import {
    ActionTypes
 } from '../../constants/actions';
const {OTP_VERIFY}  = ActionTypes;
export const submitOtpVerify = createRoutine(OTP_VERIFY);

