import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';
import { RfH, RfW } from '../../utils/helpers';

import CustomText from '../CustomText'
import imagePath from '../../constants/imagePath'
import colors from '../../constants/colors'
import styles  from './styles';
export default function PhoneNumberInput({
  cca2 = '',
  callingCode = '',
  onChangePhone,
  onCountryChange,
  phoneNumber,
  placeholder,
  containerStyle,
  color,
  keyboardType = 'numeric',
  returnKeyType = 'done',
  borderColor = colors.black,
  label = null,
  labelStyle = {},
  borderLeftColor = null,
  callingCodeTextStyle = {},
  textinputStyle,
}) {
  const [state, setState] = useState({
    countryPickerModalVisible: false,
  });

 

  const _onCountryChange = data => {
    setState({countryPickerModalVisible: false});
    onCountryChange(data);
  };
  const _openCountryPicker = () => {
    setState({countryPickerModalVisible: true});
  };
  const _onCountryPickerModalClose = () => {
    setState({countryPickerModalVisible: false});
  };
  const {countryPickerModalVisible} = state;
  return (
    <>
      {label && (
        <View>
          <CustomText
          fontWeight='bold'
          styling={{...styles.label, ...labelStyle}}>{label}</CustomText>
        </View>
      )}
      <View
        style={{
          flexDirection:'row',
        //   borderBottomWidth: 1,
        //   borderRadius: 13,
        //   borderColor: borderColor ? borderColor : colors.white,
          height: RfH(48),
          ...containerStyle,
        }}>
        <TouchableOpacity
          style={{
            flexDirection:
             'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: RfW(88),
            borderBottomWidth:1,
            borderBottomColor:'#E5E5E5'
          }}
          onPress={_openCountryPicker}>
          <View style={{marginRight: RfW(-5)}}>
            <Flag countryCode={cca2}
            flagSize={24}
            />
          </View>
          <CustomText
          color={colors.black}
          fontWeight={'500'}
            styling={[
              {
                marginStart: RfW(2),
              },
              callingCodeTextStyle,
            ]}>
            +{callingCode}
          </CustomText>
            <View style={{paddingHorizontal:RfW(8)}}>
            <Image source={imagePath.ic_small_dropdown} />

            </View>
        </TouchableOpacity>
        <TextInput
          selectionColor={color.black}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={phoneNumber}
          placeholderTextColor={color ? color : colors.textGreyOpcaity7}
          onChangeText={onChangePhone}
          style={[
            styles.textInputStyle,
           
          ]}
          returnKeyType={returnKeyType}
        />
        {countryPickerModalVisible && (
          <CountryPicker
            withCallingCode={callingCode}
            cca2={cca2}
            visible={countryPickerModalVisible}
            withFlagButton={false}
            withFilter
            onClose={_onCountryPickerModalClose}
            onSelect={_onCountryChange}
            closeButtonImage={imagePath.closeButton}
          />
        )}
      </View>
    </>
  );
}


