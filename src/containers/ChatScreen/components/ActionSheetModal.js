import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { CustomText } from '../../../components';
import imagePath from '../../../constants/imagePath';
import Modal from 'react-native-modal';
import { BlurView } from "@react-native-community/blur";
import { RfH, RfW } from '../../../utils';
import commonStyles from '../../../themes/commonStyles';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const RenderActionSheetModal = ({ isVisible, onCloseActionSheet }) => {
  const [reactionLists, setReactionList] = useState([{
    name: 'Reply',
    icon: imagePath?.block
  },
  {
    name: 'Copy',
    icon: imagePath?.block
  },

  {
    name: 'Share',
    icon: imagePath?.block
  },
  {
    name: 'Forward',
    icon: imagePath?.block
  },

  {
    name: 'Private Reply',
    icon: imagePath?.block
  },
  {
    name: 'Translate',
    icon: imagePath?.block
  },
  {
    name: 'Info',
    icon: imagePath?.block
  },
  {
    name: 'Delete',
    icon: imagePath?.block
  },
  {
    name: 'Report to admin',
    icon: imagePath?.block
  },
  {
    name: 'Flag',
    icon: imagePath?.block
  }
  ]

  )


  return <Modal
    isVisible={isVisible}
    onSwipeComplete={() => onCloseActionSheet(false)}
    onBackdropPress={() => onCloseActionSheet(false)}
    transparent={true}
    backdropColor={'transparent'}
    backdropOpacity={0.0}
    style={styles.actionModalMain}

  >
    <BlurView
      style={styles.blurView}
      blurType='light'
      blurAmount={10}
      reducedTransparencyFallbackColor="rgba(255,255,255,0.11)"
    />
    <View style={{ flex: 1 }} />
    <View style={styles.actionToModalView}>
      <View
        style={styles.subContainerTopModal}
      >
        {reactionLists.map((item, index) => {
          return <Pressable
            key={index + 'reactions'}
            onPress={() => onCloseActionSheet(false)}
            style={styles.rowFront}>
            <Image source={imagePath?.block} />
            <View style={styles.padd16}>
              <CustomText
                color='#333333'
                fontWeight='600' styling={{
                  lineHeight: 40
                }}>{item?.name}</CustomText>
            </View>
          </Pressable>
        })}
      </View>
    </View>

  </Modal>
}

export default RenderActionSheetModal