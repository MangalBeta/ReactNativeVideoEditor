
import ReactNative from 'react-native';
import { Applanga } from 'applanga-react-native';

import en from './en';
import ar from './ar';
import ur from './ur';

import { getSaveData, storeData } from '../../utils/helpers';
import RNRestart from 'react-native-restart';
import { isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/ar'
import {LOCALSTORAGE_DATA_KEY } from '../constants';

var localisedMap;

var defaultLanguage = "en"
var selectedLanguage = "en";



const getStoreLanguage = () => {
  getSaveData(LOCALSTORAGE_DATA_KEY.APP_LANGUAGE).then((res) => {
        selectedLanguage = isEmpty(JSON.parse(res)) ? defaultLanguage : JSON.parse(res);
        moment.locale('en')
    }).catch(e => { })
};

const getLocalisedDate = (value, format) => {
    var localMomentObj = moment(value);
    localMomentObj.locale(selectedLanguage)
    return localMomentObj.format(format);
}

const getSelectedLanguage = () => {
    return selectedLanguage;
};

async function initLocalisations(callback) {
    try {
        // await Applanga.update()
        // localisedMap = await Applanga.localizeMap(
        //     {
        //         "en": en,
        //         "ar": ar
        //     })
    } catch (e) {
        console.error(e);
    }
    callback()
}

const changeLanguageHandler = (lang) => {
    Applanga.setLanguage(lang).then((res) => {
        Applanga.update();
        storeData(LOCALSTORAGE_DATA_KEY.APP_LANGUAGE, JSON.stringify(lang)).then((r) => {
            const isRTL = lang != undefined && lang == 'ar' ? true : false;
            ReactNative.I18nManager.forceRTL(isRTL);
            RNRestart.Restart();
        }).catch(e => {})
    }).catch(e => { })
  };

function localize(key) {
    var translation;
    if (localisedMap != undefined && localisedMap != null) {
        const languageMap = localisedMap[selectedLanguage]
        translation = languageMap[key]
        if (translation == null) {
            const defaultLanguageMap = localisedMap[defaultLanguage]
            return defaultLanguageMap[key]
        }
        return translation
    }
    return selectedLanguage === "en" ? en[key] : ur[key]
}

/**
 * 
 * @param {string} key A unique identifier for the translation
 * @param {string} value The default/fallback value
 * @param {object} args An object with keys-values as arguments
 * @returns Localized string
 */
function getStringWithArguments(key, value, args) {
    let translation = localize(key);
    if (!isEmpty(translation)){
        Object.entries(args).forEach(([replacementKey, replacementValue]) => {
            /**
             *  The replacementKey should be in the following format - %{replacementKey}
             */
            translation = translation.replace(`%{${replacementKey}}`, replacementValue);
            if(isRTL() === 'rtl') {
                translation = translation.replace(`{${replacementKey}}%`, replacementValue);
            }
        });
    }
    return translation;
}

const localizeImage = (imageName) => {
    // if (selectedLanguage !== defaultLanguage && Images[`${imageName}_${selectedLanguage}`]) {
    //     return Images[`${imageName}_${selectedLanguage}`];
    // }

    return null;
}

const localizeJSONFiles = (arr, key) => {
    if (selectedLanguage !== defaultLanguage && arr[`${key}_${selectedLanguage}`]) {
        return arr[`${key}_${selectedLanguage}`]
    }
    return arr[key];
}

const isRTL = () => {
    return selectedLanguage == 'ar' ? 'rtl' : 'ltr'
}


export { initLocalisations, localize, getStoreLanguage, changeLanguageHandler, selectedLanguage, localizeImage, localizeJSONFiles, getSelectedLanguage, isRTL, getLocalisedDate, getStringWithArguments };

