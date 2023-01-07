/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image ,Pressable,View} from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { CustomText } from '../../../components';
import colors from '../../../constants/colors';
import imagePath from '../../../constants/imagePath';
import commonStyles from '../../../themes/commonStyles';
import { RfH, RfW } from '../../../utils';
export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: colors.white,
      paddingHorizontal: RfW(4),
      paddingRight: RfW(4),
      borderRadius: RfH(8),
      marginHorizontal: 8,
      borderColor: 'transparent',
      height:RfH(48),
      borderWidth:0,
      marginBottom:8,
      ...commonStyles.shadowButtonMid,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);


export const renderActions = (props,setIsVisible) => (

  <><Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -5,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <Image
        style={{ width: 24, height: 24 }}
        source={imagePath?.ic_add_chat}
      />
    )}
    options={{
      'Media': () => {
        console.log('Choose From Library');
      },
      'Document': () => {
        console.log('Choose From Library');
      },
      'Location': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
  // optionTintColor="red"
  />
 
  </>
);


export const renderComposer = (props) => (
  <View style={{flexDirection: 'row',flex:1}}>
  <Composer {...props} />
</View>
);

const CustomVideoButton = (props)=>{
  return <View
  {...props}
  disabled={!props.text}
  style={{
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderTopRightRadius: RfH(8),
    borderBottomRightRadius: RfH(8),
  }}
>
  <Image
    resizeMode='contain'
    style={{
      height:28,width:28
    }}
    source={imagePath.ic_video}
  />
</View>
}
const CustomAudioButton = (props)=>{
  return <View
  {...props}
  disabled={!props.text}
  style={{
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',

  }}
>
  <Image
    resizeMode='contain'
    style={{
      height:28,width:28
    }}
    source={imagePath.ic_audio} />
  
</View>
}

const CustomeRenderBtnText = (props) =>{
  return <Pressable
  {...props}
  onPress={()=>props.onSend()}
  disabled={!props.text}
  style={{
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: RfH(8),
    borderBottomRightRadius: RfH(8),
  }}
>
  <Image
    resizeMode='contain'
    style={{
      height:28,width:28
    }}
    source={imagePath.ic_send_chat}
  />

</Pressable>
}

export const renderSend = (props) => (
  <View style={{flexDirection:'row'}}>
 {props?.text  ? <CustomeRenderBtnText {...props}/> : null}
  {!props?.text ? <CustomAudioButton {...props}/> : null}
  {!props?.text ? <CustomVideoButton {...props}/>:null}
  </View>
);


