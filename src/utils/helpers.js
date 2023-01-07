import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dimensions,
  PixelRatio,
  Platform,
  Alert
} from 'react-native';
var CryptoJS = require("crypto-js");

import {showMessage} from 'react-native-flash-message';
import env from 'react-native-config'
import {LOCALSTORAGE_DATA_KEY} from '../constants/constants';

import { STANDARD_SCREEN_DIMENSIONS } from '../constants/constants';
import { localize } from '../constants/lang';
import { isEmpty } from 'lodash';




/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
  const createReducer = (initialState, handlers) =>
 function reducer(state = initialState, action) {
   if ({}.hasOwnProperty.call(handlers, action.type)) {
     return handlers[action.type](state, action);
   }
   return state;
 };

 export const getBaseUrl = async () => {
  const base_url = await AsyncStorage.getItem(LOCALSTORAGE_DATA_KEY.BASE_URL);
  if (base_url) {
      return base_url;
  } else {
      return 'https://api.fivvia.com';
  }
};
 export const storeData = async (key, value) => {
  try {
      let v = value;
      if (typeof (value) !== 'string') {
          v = JSON.stringify(value);
      }
      await AsyncStorage.setItem(key, v);
  } catch (e) {
      throw e;
  }
};

 const getSaveData = key => AsyncStorage.getItem(key, value => value);

const removeData = key => AsyncStorage.removeItem(key);

const clearStorage = () => AsyncStorage.clear();

const RfW = value => {
  const dim = Dimensions.get('window');
  return dim.width * (value / STANDARD_SCREEN_DIMENSIONS.width);
};

const RfH = value => {
  const dim = Dimensions.get('window');
  return dim.height * (value / STANDARD_SCREEN_DIMENSIONS.height);
};

const Width = value => {
  const dim = Dimensions.get('window').width;
  return dim
}
const Height = value => {
  const dim = Dimensions.get('window').height;
  return dim
};

export const convertMobileCodeToDialCode = (mobileCode) => {
  const dialCode = mobileCode.split(':')[1].replace(/\s/g, '');
  return parseInt(dialCode, 10).toString();
};


export const alertBox = (
  alertTitle = '',
  alertMsg = '',
  config = {
      positiveText: localize('common.ok'),
      cancelable: true,
  },
) => {
  let configuration = [
      {
          text: config.positiveText, // Key to show string like "Ok" etc. i.e. positive response text
          onPress: config.onPositiveClick, // Key that contains function that executes on click of above text button
      },
  ];
  if (config.middleText && !isEmpty(config.middleText)) {
      configuration = [
          ...configuration,
          {
              text: config.middleText, // Key to show string like "Cancel" etc. i.e. negative response text
              onPress: config.onMiddleClick, // Key that contains function that executes on click of above text button
          },
      ];
  }
  if (config.negativeText && !isEmpty(config.negativeText)) {
      configuration = [
          ...configuration,
          {
              text: config.negativeText, // Key to show string like "Cancel" etc. i.e. negative response text
              onPress: config.onNegativeClick, // Key that contains function that executes on click of above text button
              style: 'destructive',
          },

      ];
  }
  Alert.alert(
      alertTitle,
      alertMsg,
      configuration,
      { cancelable: config.cancelable },
  );
};

const showError = (message) => {
  console.log(message, 'THIS IS MESSAGE');

  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
   
  });
  // Toast.show(message);
};

const showSuccess = (message) => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });

  // Toast.show(message);
};
const showInfo = (message) => {
  showMessage({
    type: 'info',
    icon: 'info',
    message,
  });
  // Toast.show(message);
};




//Dycrypt data
const decryptData = (data, key) => {
  if(!data || !key){
    return null;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(data, key);
    if (bytes.toString()) {

      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return data;
  } catch (e) {
    return data;
  }
} 

//Dycrypt data
const encryptData = (data, key) => {
  if(!data){
    return '';
  }
  try {
    return CryptoJS.AES.encrypt(data, key).toString();
  } catch (e) {
    console.log(e);
  }
} 



export {
  encryptData,
  decryptData,
  showInfo,
  showError,
  showSuccess,
  showMessage,
  Width,
  Height,
    RfW,
    RfH,
    getSaveData,
    removeData,
    clearStorage,
    createReducer
}