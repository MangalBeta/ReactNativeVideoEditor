

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Platform, TouchableOpacity, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ButtonComponent, AuthHeader, TextInputWithLabel, CustomText } from '../../../../components';
import colors from '../../../../constants/colors';
import navigationStrings from '../../../../constants/navigationStrings';

import imagePath from '../../../../constants/imagePath';
import strings, { localize } from '../../../../constants/lang';
import { RfH, RfW, showError, Height } from '../../../../utils/helpers';
import styles from '../../styles';
import { api } from '../../../../utils/api';
import { commonGetCaptcha, commonSecurityQuestion } from '../../../../utils/url';
import { getVerificationserSelector } from '../../../../redux/selectors/verification';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { createSecurityQuestion } from '../../../../redux/actions';
import { getSecurityQuestionDoneSelector } from '../../../../redux/selectors/signup';
import BottomListModal from '../../../../components/BottomListModal';


const stateSelector = createStructuredSelector({
    user: getVerificationserSelector,
    isSubmitSecurityQuest: getSecurityQuestionDoneSelector
});
const SecurityQuestionAnswer = ({ navigation, route }) => {
    const paramData = route?.params?.data;
    console.log(paramData, "paramDataparamData")
    const { user } = useSelector(stateSelector);
    const [questionArray, setQuestionArray] = useState([])
    const [activeIndex, setActiveIndex] = useState(null)
    const [attempt, setAttampt] = useState(3)
    const [openModal, setOpenModal] = useState(false);
    const [selectedData, onSelectData] = useState(null)
    const [modalProps, setModalProps] = useState({
        label: 'Select Profile',
        data: paramData?.data?.accounts
    })

    useEffect(() => {
        getSecurityQuestions()
    }, [])



    const getSecurityQuestions = async () => {
        try {
            const resposne = await api({
                method: 'GET',
                url: `${commonSecurityQuestion}&key=shakalya195@gmail.com`,
            });
            if (resposne?.success) {
                const { data } = resposne?.data

                if (data?.securityQA.length) {
                    const modifyArray = data?.securityQA.map((x) => {
                        return { ...x, yourAns: '' }
                    })
                    setQuestionArray([...modifyArray])
                }
            }
        } catch (error) {
            console.log(error, "errorooor")
            // showError(error)
        }
    }
    const moveToNewScreen =
        (screenName, data = {}) =>
            () => {
                navigation.navigate(screenName, { data });
            };
    const onChangeSecurityInput = (data, index) => {
        const modifyArray = questionArray.map((x, i) => {
            if (index == i) {
                return {
                    ...x,
                    yourAns: data
                }
            } else {
                return {
                    ...x,
                    yourAns: ''
                }
            }
        })
        setQuestionArray(modifyArray)
    }
    useEffect(() => {
        if (selectedData) {
            setOpenModal(false)
            moveToNewScreen(navigationStrings.RESET_PASSWORD, {
                ...paramData?.data,
                user: selectedData
            })()
        }

    }, [selectedData])

    const onSubmitQuestionary = () => {
        const filterAnserwer = questionArray.filter(x => x.yourAns)
        if (filterAnserwer && filterAnserwer.length > 0) {
            if (attempt < 1) {
                moveToNewScreen(navigationStrings.ENTER_DOB, {
                    ...paramData?.data
                })()
            } else {
                if (filterAnserwer?.[0]?.ans == filterAnserwer?.[0]?.yourAns) {
                    if(paramData?.data?.accounts && paramData?.data?.accounts.length > 1){
                        setOpenModal(true)
                    }else{
                        moveToNewScreen(navigationStrings.RESET_PASSWORD, {
                            ...paramData?.data,
                            user: paramData?.data?.accounts?.[0]
                        })()
                    }

                } else {
                    setAttampt(attempt - 1)
                    return showError('Answer is not matched with your security answer.')
                }
            }
        } else {
            showError('Please selet any security question to answer.')
            return
        }
    }
    const renderSecurityQuestionList = () => {
        return <View style={{ marginTop: RfH(16) }}>
            {questionArray.map((item, index) => <View key={index + 'ans'}
                style={{
                    marginVertical: RfH(12)
                }}
            ><TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    if (index == activeIndex) {
                        setActiveIndex(-1)
                    } else {
                        setActiveIndex(index)
                    }
                }
                }
                style={[styles.questionRow, {
                    borderColor: index == activeIndex ? colors.shadowColor : 'rgba(151, 151, 151, 0.2)',
                    borderBottomWidth: 0,
                    borderBottomRightRadius: 4,
                    borderBottomLeftRadius: 4,

                }]}>
                    <View style={{ flex: 0.9 }}>
                        <CustomText
                            color={'rgba(0,0,0,0.6)'}
                            fontWeight={'600'} fontSize={12}>
                            {item?.ques}
                        </CustomText>
                    </View>
                    <View>
                        <Image source={item?.ans ? imagePath?.ic_selected_question : imagePath.ic_small_dropdown} />
                    </View>
                </TouchableOpacity>
                {index == activeIndex && <TextInputWithLabel
                    autoCapitalize="none"
                    borderFocusColor={colors.shadowColor}
                    labelTextColor={'rgba(0,0,0,0.5)'}
                    maxLength={60}
                    inputText={item?.yourAns}
                    placeholder={'Answer here…'}
                    placeholderTextColor={'rgba(0,0,0,0.4)'}
                    onChangeText={text => onChangeSecurityInput(text, index)}
                    returnKeyType="default"
                    selectionColor={colors.shadowColor}
                    textInputContainerStyle={styles.inputTextContainer}
                    textInputStyle={styles.inputTextColor}
                />}

            </View>
            )}
        </View>
    }
    return (
        <View style={{
            flex: 1
        }}>
            <AuthHeader
                title={'Answer The Questions'}
                showBottomLogo={true}
              customMainHeadContainer={{ flex: 0.65 }}
                bgImage={imagePath?.bigHeaderBgImage}
                bottomLogoImage={imagePath?.askBg}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={styles.keyBoardView}>
                <View style={{
                    marginTop: RfH(24)
                }}>
                    {questionArray.length > 0 ? <View style={styles.topView}>
                        <CustomText fontSize={18}
                            fontWeight={'bold'}
                            color={colors.black} styling={{
                                lineHeight: 24,
                                textAlign: 'center'
                            }}>
                            {'Select any security question to answer'}
                        </CustomText>
                    </View> : null}

                    {questionArray.length ? renderSecurityQuestionList() : null}
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
                selectedData={selectedData}
                setModalProps={setModalProps}
                setOpenModal={(status) => setOpenModal(status)}
            />}
        </View>

    );
};
export default SecurityQuestionAnswer
