import validator from 'is_js';
import  { localize } from '../constants/lang';
const checkEmpty = (val, key, key2 = true) => {
  if (validator.empty(val.trim())) {
    return `${localize("validation.PLEASE_ENTER")} ${key2 ? `${localize("validation.YOUR")} ` : ''}${key}`;
  } else {
    return '';
  }
};

const checkEmptyForSelection = (val, key, key2 = true) => {
  if (validator.empty(val)) {
    return `${localize("validation.PLEASE_SELECT")} ${key2 ? `${localize("validation.YOUR")} ` : ''}${key}`;
  } else {
    return '';
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `${localize("validation.PLEASE_ENTER_VALID")} ${key}`;
  } else {
    return '';
  }
};

const checkNumeric = (val, key) => {
  if (isNaN(val)) {
    return false;
  } else {
    return `${localize("validation.PLEASE_ENTER_VALID_NUMERIC")} ${key}`;
  }
};

export function checkValidUrl(value,key) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if(!!pattern.test(value)){
        return false
    }else{
      return `${localize("validation.PLEASE_ENTER_VALID")} ${key}`;
    }
}
export default function (data) {
  let error = '';
  const {
    username,
    email,
    name,
    password,
    phoneNumber,
    firstName,
    lastName,
    confirmPassword,
    otp,
    newPassword,
    retypePassword
  } = data;
  if (firstName !== undefined) {
    let emptyValidationText = checkEmpty(firstName, localize("validation.FIRSTNAME"));
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(firstName, 3, localize("validation.FIRSTNAME"));
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  if (lastName !== undefined) {
    let emptyValidationText = checkEmpty(lastName, localize("validation.LASTNAME"));
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(lastName, 3, localize("validation.LASTNAME"));
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }


  if (username !== undefined) {
    let emptyValidationText = checkEmpty(username, localize("validation.Name"));
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(username, 3, localize("validation.Name"));
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  if (otp !== undefined) {
    let emptyValidationText = checkEmpty(otp, localize("validation.OTP"));
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(otp, 4, localize("validation.OTP"));
      if (minLengthValidation !== '') {
        return minLengthValidation;
      }
    }
  }

  
 

  if (email !== undefined) {
    if (email === 'emptyValid') {
      return;
    }
    let emptyValidationText = checkEmpty(email, localize("validation.EMAIL"));
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        return localize("validation.PLEASE_ENTER_VALID_EMAIL");
      }
    }
  }

  if (phoneNumber !== undefined) {
    if (phoneNumber === 'emptyValid') {
      return;
    }
    if (phoneNumber == '') {
      return  localize("validation.PLEASE_ENTER_YOUR_PHONE_NUMBER");
    }
    if (!/^[0][1-9]$|^[1-9]\d{4,14}$/.test(phoneNumber)) {
      return localize("validation.PLEASE_ENTER_VALID_PHONE_NUMBER");
    }
  }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, localize('validation.PASSWORD'));
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(password, 6, localize('validation.PASSWORD'));
      if (minLengthValidation !== '') {
        if (password != undefined) {
          return localize("validation.PASSWORD_REQUIRE_SIX_CHARACTRES");
        }
        return localize("validation.INVALID_PASSWORD");
      }
    }
  }
  
  if (newPassword !== undefined) {
    let emptyValidationText = checkEmpty(newPassword, 'New Password');
    if (emptyValidationText !== '') {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(newPassword, 6, 'New Password');
      if (minLengthValidation !== '') {
        if (newPassword != undefined) {
          return 'New Password requires minimum 6 characters';
        }
        return 'New Password is incorrect';
      }
    }
  }

  if (retypePassword !== undefined) {
    let emptyValidationText = checkEmpty(
      retypePassword,
      'Retype Password'
    );
    if (emptyValidationText !== '') {
      return emptyValidationText;
    }
    if (retypePassword != newPassword) {
      return "New Password and Retype Password did not matched"
    }
  }
  

}
