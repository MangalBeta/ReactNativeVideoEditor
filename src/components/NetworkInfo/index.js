import React, {useEffect, useState} from 'react';
import {Modal,Image, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import {RfH, RfW} from '../../utils/helpers';
import {CustomText} from '..';
import { localize } from '../../constants/lang/index';
import imagePath from '../../constants/imagePath';

function NetworkInfo(props) {
  const { netInfo, headerText, subText, btnText, handleRequest} = props;
  const [show, setShow] = useState(false);
    useEffect(() => {
        if(!netInfo) {
            const timer = setTimeout(() => {
                setShow(true);
            }, 2000);
            return () => clearTimeout(timer);
        }else{
            setShow(false);
        }
    }, [netInfo]);

  return (
    <>
      {!netInfo && show && <Modal visible={true}  transparent={false} animationType={'slide'} >
           <View style={styles.container}>
                <View style={styles.noBookingView}>
                    <Image source={imagePath?.SAD} iconHeight={RfW(285)} iconWidth={RfW(275)}/>
                     <View style={[styles.headerContainer, {justifyContent:'center', alignItems:'center'}]}>
                        <CustomText fontSize={17} fontWeight={'bold'} color="rgb(38,33,25)">{localize(headerText)}</CustomText>
                        <CustomText fontSize={13} styling={{marginTop: RfH(10), textAlign:'center'}}>{localize(subText)}</CustomText>
                    </View>
                    <View style={styles.bottomBtnContainer}>
                        <TouchableOpacity onPress={handleRequest} style={{}}>
                            <CustomText fontSize={14} fontWeight={'bold'} color="rgb(38,33,25)" styling={{textAlign:'center'}}>{localize(btnText)}</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
         </Modal>}
    </>
  );
}

NetworkInfo.propTypes = {
    netInfo: PropTypes.bool,
    seconds:PropTypes.number,
    headerText: PropTypes.string,
    subText: PropTypes.string,
    btnText:PropTypes.string,
    handleRequest:PropTypes.func,
};

NetworkInfo.defaultProps = {
    netInfo: false,
    headerText: 'common.oops',
    subText: 'common.noInternetMessage',
    btnText:'common.tryAgain',
    seconds:0,
    handleRequest:null,
};

export default NetworkInfo;
