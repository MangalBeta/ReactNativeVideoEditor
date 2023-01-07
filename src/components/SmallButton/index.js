import React, {useRef} from 'react';
import {
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { STANDARD_SCREEN_SIZE } from '../../constants/constants';
import { RfH,RfW } from '../../utils/helpers';
import styles from './styles';
import cssStyle from './styles.css';
import imagePath from '../../constants/imagePath';


const SmallButtonComponent = ({
  onPress,
  buttonTitle = '',
  buttonStyle = {},
  imagevalue = false,
  imageStyle={},
  buttonTextStyle={}
  
}) => {
  return (
    <View style={[styles.container,cssStyle.buttonMainStyle]}>
      <LinearGradient 
      style={[styles.button,buttonStyle]}
      start={{
        x:0.05,
        y:0
      }}
      end={{
        x:0.05,
        y:0.8
      }}
      colors={['#2EB3FF','#0066FE']}
      > 
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{alignSelf:'center'}}>
           <Image
           resizeMode='contain'
           source={imagePath?.ic_next} />
          {/* <Text style={[styles.text,buttonTextStyle]}>{buttonTitle}</Text> */}
        </View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    </View>
  );

};



export default SmallButtonComponent;
