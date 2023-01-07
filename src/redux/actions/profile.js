import { createRoutine } from 'redux-saga-routines';
import {
    ActionTypes
 } from '../../constants/actions';
const {GET_PROFILE,LOGOUT}  = ActionTypes;
export const getUserProfile= createRoutine(GET_PROFILE);
export const createlogOutUser= createRoutine(LOGOUT);
