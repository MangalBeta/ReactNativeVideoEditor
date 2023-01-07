import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import strings from '../../constants/lang';
import styles from './styles'
const NoInternetModal = ({show, onRetry, isRetrying}) => {
  return (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{strings.CONNECTION_ERROR}</Text>
         <Text style={styles.modalText}>
          {strings.INTERNET_CONNECTION_ERROR}
        </Text>
      </View>
    </Modal>
  );
};
export default React.memo(NoInternetModal);
