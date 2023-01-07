

import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image,Platform, TouchableOpacity, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ButtonComponent, AuthHeader, TextInputWithLabel, CustomText } from '../../components';
import colors from '../../constants/colors';
import navigationStrings from '../../constants/navigationStrings';

import imagePath from '../../constants/imagePath';
import strings, { localize } from '../../constants/lang';
import { RfH, RfW, showError,Height } from '../../utils/helpers';
import styles from './styles';
import { api } from '../../utils/api';
import { commonGetCaptcha, commonSecurityQuestion } from '../../utils/url';
import { getVerificationserSelector } from '../../redux/selectors/verification';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { createSecurityQuestion } from '../../redux/actions';
import { getSecurityQuestionDoneSelector } from '../../redux/selectors/signup';


const stateSelector = createStructuredSelector({
    user: getVerificationserSelector,
isSubmitSecurityQuest :getSecurityQuestionDoneSelector
});
const SecurityQuestion = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user ,isSubmitSecurityQuest} = useSelector(stateSelector);
    const [questionArray, setQuestionArray] = useState([{
        ques: "questionary.ques1",
        ans: ''
    }, {
        ques: "questionary.ques2",
        ans: ''
    },
    {
        ques: "questionary.ques3",
        ans: ''
    },
    {
        ques: "questionary.ques4",
        ans: ''
    },
    {
        ques: "questionary.ques5",
        ans: ''
    },
    {
        ques: "questionary.ques6",
        ans: ''
    }


    ])
    const [dob, setDob] = useState('')
    const [activeIndex, setActiveIndex] = useState(null)
    const [securityCustomeInput, setSecurityCustomeInput] = useState({})

    useEffect(() => {
        getSecurityQuestions()
    }, [])

    useEffect(()=>{
        if(isSubmitSecurityQuest){
          moveToNewScreen(navigationStrings.DRAWER_ROUTES)()
        }
      },[isSubmitSecurityQuest])

    const getSecurityQuestions = async () => {
        try {
            const resposne = await api({
                method: 'GET',
                url: `${commonSecurityQuestion}`,
            });

            if (resposne?.success) {
                const { data } = resposne?.data
                setDob(data?.dob)
                if (data?.securityQA.length) {
                    setQuestionArray([...data?.securityQA])
                } else {
                    setQuestionArray([...data?.securityQA, ...questionArray])
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
                    ans: data
                }
            } else {
                return {
                    ...x
                }
            }
        })
        setQuestionArray(modifyArray)
    }

    const isSameAnswer = (el, index, arr) => {
        return el.ans
    }

    const onSubmitQuestionary = () => {

        const filterAnserwer = questionArray.filter(x=> x.ans)
        if(filterAnserwer && filterAnserwer.length >= 3){
            const checkAllAnswer = filterAnserwer.every(isSameAnswer)
            if (!checkAllAnswer) {
                showError(localize('validation.fillAnswer'))
                return
            } else if (securityCustomeInput?.ques && !securityCustomeInput?.ans) {
                showError(localize('validation.fillCustomAnswer'))
                return
            } else {
                let securityArray = filterAnserwer
                if (securityCustomeInput?.ques && securityCustomeInput?.ans) {
                    securityArray = [...securityArray, securityCustomeInput]
                }
                const payload = {}
                payload['dob'] = dob
                payload['role'] = "F"
                payload['securityQA'] = securityArray
                payload['key'] = 'EMAIL'
                dispatch(createSecurityQuestion(payload))
            }
        }else{
            showError(localize('validation.fillAnswer'))
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
                            {localize(item?.ques)}
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
                    inputText={item?.ans}
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


    const renderOwnSecurityCode = () => {
        return <View activeOpacity={0.9}>
            <TextInputWithLabel
                autoCapitalize="none"
                borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                labelTextColor={'rgba(0,0,0,0.5)'}
                maxLength={60}
                inputText={securityCustomeInput?.ques}
                placeholder={'Type Question'}
                placeholderTextColor={'rgba(0,0,0,0.4)'}
                onChangeText={text => setSecurityCustomeInput({
                    ...securityCustomeInput,
                    ques: text
                })}
                returnKeyType="default"
                selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                textInputContainerStyle={styles.inputTextQuesContainer}
                textInputStyle={styles.inputTextColor}
                customBorderSelectionColor={{
                    borderWidth: 1,
                    borderColor: '#C1CDFB',
                    borderBottomColor: '#C1CDFB'
                }}
                handleFocusChange={() => setActiveIndex(-1)}
                handleBlurChange={() => setActiveIndex(-1)}
            />
            <TextInputWithLabel
                autoCapitalize="none"
                borderFocusColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                labelTextColor={'rgba(0,0,0,0.5)'}
                maxLength={60}
                placeholder={'Answer here…'}
                placeholderTextColor={'rgba(0,0,0,0.4)'}
                onChangeText={text => setSecurityCustomeInput({
                    ...securityCustomeInput,
                    ans: text
                })}
                returnKeyType="default"
                inputText={securityCustomeInput?.ans}

                selectionColor={colors.DEFAULT_TEXT_FIELD_FOCUSED_COLOR}
                textInputContainerStyle={{
                    ...styles.inputTextOwnerContainer,
                    top: -1,
                }}
                customBorderSelectionColor={{
                    borderWidth: 1,
                    borderColor: colors.shadowColor,
                    borderBottomWidth: 1,
                    borderLeftColor: colors.shadowColor,
                    borderRightColor: colors.shadowColor,
                    borderTopWidth: 0
                }}
                textInputStyle={styles.inputTextColor}

            />
        </View>
    }
    return (
        <View style={{
            flex: 1
        }}>
            <AuthHeader
                title={'Security Questions'}
                customMainHeadContainer={{
                    height:Platform.OS == 'android' ? Height()/5:Height()/4.5
                  }}
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
                            {localize('questionary.SELECT_ANY_QUESTION')}
                        </CustomText>
                    </View> : null}

                    {questionArray.length ? renderSecurityQuestionList() : null}
                    <View style={{ height: RfH(16) }} />

                    <View style={styles.topView}>
                        <CustomText fontSize={18}
                            fontWeight={'bold'}
                            color={colors.black} styling={{
                                lineHeight: 24,
                                textAlign: 'center'
                            }}>
                            {localize('questionary.MAKE_YOUR_OWN_SECURITY_QUESTION')}
                        </CustomText>
                    </View>
                    <View style={{ height: RfH(24) }} />

                    {renderOwnSecurityCode()}
                    <View style={{ height: RfH(8) }} />


                    <View style={{ paddingVertical: RfH(32) }}>
                        <ButtonComponent
                            buttonTitle={localize('otp.SAVEANDCONTINUE')}
                            onPress={() => onSubmitQuestionary()} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>

    );
};
export default SecurityQuestion
