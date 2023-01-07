

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Platform, TouchableOpacity, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ButtonComponent, AuthHeader, TextInputWithLabel, CustomText } from '../../../../components';
import colors from '../../../../constants/colors';
import navigationStrings from '../../../../constants/navigationStrings';
import { RfH, RfW, showError, showSuccess, Height } from '../../../../utils/helpers';
import styles from '../../styles';
import myStyles from './styles';

import { getVerificationserSelector } from '../../../../redux/selectors/verification';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { getSecurityQuestionDoneSelector } from '../../../../redux/selectors/signup';
import moment from 'moment';
import BottomListModal from '../../../../components/BottomListModal';
import imagePath from '../../../../constants/imagePath';

const stateSelector = createStructuredSelector({
    user: getVerificationserSelector,
    isSubmitSecurityQuest: getSecurityQuestionDoneSelector
});
const EnterDob = ({ navigation, route }) => {
    const paramData = route?.params?.data;
    console.log(paramData, "paramDataparamData")
    const { user } = useSelector(stateSelector);
    const [attempt, setAttampt] = useState(3)
    const [state, setState] = useState({
        dob: ''
    });

    const [openModal, setOpenModal] = useState(false);
    const [selectedData, onSelectData] = useState(null)
    const [modalProps, setModalProps] = useState({
        label: 'Select Profile',
        data: paramData?.accounts
    })

    const updateState = data => setState(state => ({ ...state, ...data }));
    const moveToNewScreen =
        (screenName, data = {}) =>
            () => {
                navigation.navigate(screenName, { data });
            };

    useEffect(() => {
        if (selectedData) {
            setOpenModal(false)
            moveToNewScreen(navigationStrings.RESET_PASSWORD, {
                ...paramData,
                user: selectedData
            })()
        }

    }, [selectedData])
    const onSubmitQuestionary = () => {
        if (state?.dob) {
            if (paramData && paramData?.accounts) {
                let { accounts } = paramData
                if (attempt < 1) {
                   return moveToNewScreen(navigationStrings.LOGIN, {
    
                    })()
                } 
                if (accounts && accounts.length > 0) {
                    const dobData = accounts.some(x => {
                        return moment(x?.dob).isSame(moment(state?.dob));
                    })
                    if (dobData) {
                        if (paramData?.accounts && paramData?.accounts.length > 1) {
                            setOpenModal(true)
                        } else {
                            moveToNewScreen(navigationStrings.RESET_PASSWORD, {
                                ...paramData,
                                user: paramData?.accounts?.[0]
                            })()
                        }

                    } else {
                        setAttampt(attempt - 1)
                        return showError('Wrong date of birth')
                    }
                } else {
                    console.log(accounts, "accouaccountsaccountsnts")

                }
            }
        } else {
            return showError('Please enter dob in this format MM/DD/YYYY')
        }
    }
    return (
        <View style={{
            flex: 1
        }}>
            <AuthHeader
             showBottomLogo={true}
              customMainHeadContainer={{ flex: 0.7 }}
                title={'Enter The Date of Birth'}
                showCenterLogo={false}
                bgImage={imagePath?.bigHeaderBgImage}
                bottomLogoImage={imagePath?.cakeBg}
                customeBottomImageStyle={{
                    width:RfW(150),
                    height:RfH(180)
                }}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={styles.keyBoardView}>
                <View style={{
                    marginTop: RfH(24)
                }}>
                    <View style={styles.topView}>
                        <CustomText fontSize={18}
                            fontWeight={'bold'}
                            color={colors.black} styling={{
                                lineHeight: 24,
                                textAlign: 'center'
                            }}>
                            {'DOB (MM/DD/YYYY):'}
                        </CustomText>
                    </View>
                    <View style={styles.phoneInputView}>
                        <TextInputWithLabel
                            autoCapitalize="none"
                            borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                            inputText={state?.dob}
                            labelFocusedStyle={styles.inputFocusedFontSize}
                            labelText={'MM/DD/YYYY'}
                            labelTextColor={'rgba(0,0,0,0.5)'}
                            labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
                            maxLength={60}
                            onChangeText={text => updateState({ dob: text })}
                            returnKeyType="default"
                            selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                            textInputContainerStyle={myStyles.inputTextContainer}
                            textInputStyle={myStyles.inputTextColor}
                        />
                    </View>
                    {attempt > 0 && <View style={{
                        paddingTop: RfH(16)
                    }}>
                        <CustomText fontSize={16}
                            fontWeight={'600'}
                            color={colors.black} styling={{
                                lineHeight: 24,
                            }}>
                            {`${attempt} attampt left`}
                        </CustomText>
                    </View>}
                    <View style={{ paddingVertical: RfH(32) }}>
                        <ButtonComponent
                            buttonTitle={'Proceed'}
                            onPress={() => onSubmitQuestionary()} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {openModal && <BottomListModal
                openModal={openModal}
                modalProps={modalProps}
                onSelectData={onSelectData}
                setModalProps={setModalProps}
                setOpenModal={(status) => setOpenModal(status)}
            />}
        </View>

    );
};
export default EnterDob
