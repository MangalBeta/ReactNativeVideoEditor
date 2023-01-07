import React from 'react';
import {Modal, View, Platform} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';
import LottieView from 'lottie-react-native';
import {RfH, RfW} from '../../utils/helpers';
import {LOTTIE_JSON_FILES} from '../../constants/constants';


function Loader(props) {
  const {isLoading, text} = props;
  return (
      <>
      {isLoading?
          <>
          {Platform.OS==='ios'?
                <View
                    style={[
                      styles.modalBackground,
                      { backgroundColor: 'rgba(0,0,0,0.1)' },
                    ]}
                >
                  <LottieView
                      style={{
                        height: RfH(80),
                        width: RfH(80),
                        alignSelf: 'center',
                      }}
                      source={LOTTIE_JSON_FILES.loaderJson}
                      resizeMode="contain"
                      loop={true}
                      autoPlay
                  />
                  {/* <View style={[styles.activityIndicatorWrapper]}>*/}
                  {/*  <ActivityIndicator size="large" color={Colors.backgroundYellow} />*/}
                  {/*  <Text style={styles.title}>{text}</Text>*/}
                  {/* </View>*/}
                </View>:
                <Modal visible={isLoading} animationType={'fade'} backdropOpacity={1}
                 transparent={true}
          >
            <View
                    style={[
                      styles.modalBackground,
                      { backgroundColor: 'rgba(0,0,0,0.1)' },
                    ]}
                >
              <LottieView
                  style={{
                    height: RfW(80),
                    width: RfW(80),
                    alignSelf: 'center',
                  }}
                  source={LOTTIE_JSON_FILES.loaderJson}
                  resizeMode="contain"
                  loop={true}
                  autoPlay
              />
            {/*  <View style={[styles.activityIndicatorWrapper]}>*/}
            {/* <ActivityIndicator size="large" color={Colors.backgroundYellow} />*/}
            {/* <Text style={styles.title}>{text}</Text>*/}
            {/*  </View>*/}
            </View>
          </Modal>
          }
          </>
        :null}
      </>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
};

Loader.defaultProps = {
  isLoading: false,
  text: 'Please wait ...',
};

export default Loader;
