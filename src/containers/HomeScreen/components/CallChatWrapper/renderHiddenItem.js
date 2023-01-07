
import React, { useRef, useState } from 'react';
import { TouchableOpacity,  Image, View } from 'react-native';
import { CustomText } from '../../../../components';
import imagePath from '../../../../constants/imagePath';
import styles from '../../styles';

const RenderHiddenItem = ({ data, rowMap, isSelectedRow }) => {
    return <View style={styles.rowBack}>
      <View style={styles.rowLetBack} >
        <View style={[[styles.activeleftIconOne, isSelectedRow && styles.heightWdithActive]]}>
          <Image source={imagePath?.ic_unread_slide} />
          <CustomText
            fontSize={11}
            color={'#292929'}
            fontWeight={'600'}
          >Unread</CustomText>
        </View>
        <View style={[styles.activeleftIconTwo, isSelectedRow && styles.heightWdithActive]}>
          <Image source={imagePath?.ic_pin_slide} />
          <CustomText
            fontSize={11}
            color={'#292929'}
            fontWeight={'600'}
          >Pin</CustomText>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => null}
      >
        <View style={styles.centerRow}>
          <Image source={imagePath?.ic_more_slide} />
          <CustomText
            fontSize={11}
            fontWeight={'600'}
            color={'#292929'}
            styling={{
              lineHeight: 13
            }}
          >More
          </CustomText>
        </View>

      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => null}
      >
        <View style={styles.centerRow}>
          <Image
            resizeMode={'contain'}
            source={imagePath?.ic_archieve_slide} />
          <CustomText
            fontSize={11}
            fontWeight={'600'}
            styling={{
              lineHeight: 13
            }}
            color={'#292929'}
          >Archive</CustomText>
        </View>

      </TouchableOpacity>
    </View>
  }


  export default RenderHiddenItem