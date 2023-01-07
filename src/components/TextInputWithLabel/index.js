import React, { Component } from 'react';
import {
    TextInput,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { isEmpty, isNumber } from 'lodash';

import { RfH ,RfW} from '../../utils/helpers';
import strings from '../../constants/lang';
import imagePath from '../../constants/imagePath';
import styles from './styles';
import colors from '../../constants/colors';
export default class TextInputWrapper extends Component {
    static propTypes = {
        autoCapitalize: PropTypes.string, // input character types
        borderFocusColor: PropTypes.string,
        editable: PropTypes.bool, // this is used to enable the inputText input
        getInputRefer: PropTypes.func, // Used to get reference of Text Input
        handleBlurChange: PropTypes.func, // Used to handle on blur customizations
        handleFocusChange: PropTypes.func, // Used to handle on focus customizations
        icEye: PropTypes.bool, // Key of the input to be map with the state of container
        inputText:
            PropTypes.string.isRequired || PropTypes.number.isRequired,
        labelFocusedStyle: PropTypes.object,
        labelIconPath: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]), // Label Text to be displayed
        labelIconPathSvg: PropTypes.oneOfType([
            PropTypes.string
        ]), // Label Text to be displayed
        labelText: PropTypes.string.isRequired, // Color for the label of the inputText
        labelTextColor: PropTypes.string,
        labelUnFoucsedStyle: PropTypes.object,
        leftIconStyling: PropTypes.object, // Callback to handle inputText change
        maxLength: PropTypes.number,
        onChangeText: PropTypes.func.isRequired,
        onSubmitEditing: PropTypes.func,
        placeholder: PropTypes.string,
        placeholderTextColor: PropTypes.string,
        renderClearBtn: PropTypes.bool, // Keyboard Format for the inputText field
        returnKeyMode: PropTypes.string,
        returnKeyType: PropTypes.string,
        keyboardType: PropTypes.string,
        rightIconClickListener: PropTypes.func, // To show the protected inputText
        rightIconPath: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        rightIconPathSvg: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        secureTextEntry: PropTypes.bool,
        selectionColor: PropTypes.string,
        showReturnKeyType: PropTypes.bool,
        textInputContainerStyle: PropTypes.object,
        textInputStyle: PropTypes.object,
        triggerBlur: PropTypes.bool, // This will help in updating the cursor position for the initial value
        rightIconText: PropTypes.string,
        validateFields: PropTypes.bool,
        isbuttonPressed: PropTypes.bool,
        errorText: PropTypes.string,
        clearBtnBgColor: PropTypes.string,
        clearBtnTxtColor: PropTypes.string,
        emptyErrorText: PropTypes.string,
        useSVGImage: PropTypes.bool, // This will help in show svg icons

    };

    static defaultProps = {
        renderClearBtn: false,
        borderFocusColor: '#EDEEF0',
        editable: true,
        getInputRefer: () => { },
        handleBlurChange: () => { },
        handleFocusChange: () => { },
        labelTextColor: '#000000',
        returnKeyType: undefined,
        secureTextEntry: false,
        textInputStyle: {},
        labelIconPath: '',
        labelIconPathSvg: '',
        rightIconPath: '',
        rightIconPathSvg: '',
        rightIconText: '',
        textInputContainerStyle: {},
        labelFocusedStyle: {},
        labelUnFoucsedStyle: {},
        placeholder: '',
        placeholderTextColor: '#858F99',
        leftIconStyling: {},
        autoCapitalize: 'words',
        inputText: '',
        icEye: false,
        returnKeyMode: 'done',
        clearBtnBgColor: '#737373',
        clearBtnTxtColor: '#313943',

        onSubmitEditing: () => { },
        maxLength: 100,
        selectionColor: undefined,
        triggerBlur: false,
        showReturnKeyType: true,
        rightIconClickListener: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            showClearBtn: props.renderClearBtn && !isEmpty(props.inputText),
            isActive: false,
            showPassword: false,
            eyeIconSource: imagePath.ic_eye,
            dynamicProps: {
                selection: { start: 0, end: 0 },
            },
        };
    }

    componentDidMount() {
        const { triggerBlur } = this.props;
        if (triggerBlur) {
            this.inputTextReferer.focus();
            this.inputTextReferer.blur();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const { isActive } = this.state;
        if (nextProps.inputText) {
            this.setState({
                showClearBtn: isActive,
            });
        }
    }

    handleFocus = () => {
        const { handleFocusChange, id, inputText } = this.props;
        this.setState(
            {
                isFocused: true,
                showClearBtn: !!inputText,
                isActive: true,
                dynamicProps: {},
            },
            () => {
                if (handleFocusChange) {
                    handleFocusChange(true, id);
                }
            },
        );
    };

    handleBlur = () => {
        const { handleBlurChange, triggerBlur } = this.props;
        let dynamicProps = {};

        // Adding selection props by default was causing bad user experience
        if (triggerBlur) {
            dynamicProps = {
                selection: { start: 0, end: 0 },
            };
        }

        this.setState(
            {
                isFocused: false,
                showClearBtn: false,
                isActive: false,
                dynamicProps,
            },
            () => {
                if (this.inputTextReferer && handleBlurChange) {
                    handleBlurChange(false, this.inputTextReferer);
                }
            },
        );
    };

    onTextChanged = (value,key) => {
        const { onChangeText } = this.props;
        console.log(value,"valueueuueuuee")
       onChangeText(value,key);

    };

    onCancelBtnClick = id => {
        const value = '';
        this.onTextChanged(id, value);

        if (this.inputTextReferer) {
            this.inputTextReferer.blur();
            this.handleBlur();
        }
    };

    checkIfLabelExist = () => {
        const { labelIconPath } = this.props;
        return !isEmpty(labelIconPath) || isNumber(labelIconPath);
    };

    checkIfLabelExistSvg = () => {
        const { labelIconPathSvg } = this.props;
        return !isEmpty(labelIconPathSvg) || isNumber(labelIconPathSvg);
    };

    checkIfIconExist = () => {
        const { rightIconPath } = this.props;
        return !isEmpty(rightIconPath) || isNumber(rightIconPath);
    };

    checkIfIconExistSvg = () => {
        const { rightIconPathSvg } = this.props;
        return !isEmpty(rightIconPathSvg) || isNumber(rightIconPathSvg);
    };

    getBorderFocusColor = () => {
        const { isFocused } = this.state;
        const { borderFocusColor,customBorderSelectionColor={} } = this.props;
        return (
            isFocused && {
                borderBottomColor: borderFocusColor || colors.themeColor,
                ...customBorderSelectionColor
            }
        );
    };

    getLabelStyle = () => {
        const { isFocused } = this.state;
        const {
            labelFocusedStyle,
            labelUnFoucsedStyle,
            inputText,
        } = this.props;
        const {
            defaultFocusedLabelStyle,
            defaultUnfocusedLabelStyle,
        } = styles;

        if (isFocused) {
            return { ...defaultFocusedLabelStyle, ...labelFocusedStyle };
        }

        if (!!inputText) {
            return {
                ...defaultFocusedLabelStyle,
                ...labelUnFoucsedStyle,
                ...{ fontSize: 11 },
            };
        }

        return { ...defaultUnfocusedLabelStyle, ...labelUnFoucsedStyle };
        // return isFocused || !isEmpty(inputText)
        //   ? { ...defaultFocusedLabelStyle, ...labelFocusedStyle }
        //   : { ...defaultUnfocusedLabelStyle, ...labelUnFoucsedStyle }
    };

    changePwdType = () => {
        let newState;
        const { showPassword } = this.state;
        if (showPassword) {
            newState = {
                icEye: 'visibility',
                showPassword: false,
                eyeIconSource: imagePath?.ic_eye,
            };
        } else {
            newState = {
                icEye: 'visibility-off',
                showPassword: true,
                eyeIconSource: imagePath?.ic_eye_active,
            };
        }
        // set new state value
        this.setState(newState);
    };

    render() {
        const {
            editable,
            labelText,
            returnKeyType,
            inputText,
            id,
            textInputStyle,
            labelTextColor,
            labelIconPath,
            labelIconPathSvg,
            maxLength,
            textInputContainerStyle,
            secureTextEntry,
            rightIconPath,
            rightIconPathSvg,
            placeholder,
            placeholderTextColor,
            leftIconStyling,
            autoCapitalize,
            getInputRefer,
            renderClearBtn,
            icEye,
            returnKeyMode,
            onSubmitEditing,
            selectionColor,
            showReturnKeyType,
            rightIconClickListener,
            eyeIconStyle,
            leftLabelIconStyle,
            showMandatory,
            rightIconText,
            keyboardType,
            validateFields,
            isbuttonPressed,
            errorText,
            emptyErrorText,
            contextMenuHidden,
            clearBtnBgColor,
            clearBtnTxtColor,
            minlength,
            isNocForm = false,
            useSVGImage = false,
            customeRightIconStyle={}
        } = this.props;
        const {
            container,
            defaultTextInputStyle,
            labelIconStyle,
            rightIconStyle,
            innerTextWrapStyle,
            clearBtnWrap,
            clearBtnStyle,
            textInputViewStyle,
            eyeBtnStyle,
            manatoryField,
            rightIconTextStyle,
            errorTextStyle,
            alignTextRight,
        } = styles;
        const fixedLabelStyle = {
            position: 'absolute',
            color: labelTextColor,
            
        };

        const labelStyle = {
            ...fixedLabelStyle,
            ...this.getLabelStyle(),
        };

        const textInputWrapStyle = {
            ...container,
            ...textInputContainerStyle,
            ...this.getBorderFocusColor(),
        };
        const inputStyle = {
            ...defaultTextInputStyle,
            ...textInputStyle,
        };
        const inputValue = (inputText && inputText.toString()) || '';
        const {
            showClearBtn,
            showPassword,
            eyeIconSource,
            dynamicProps,
        } = this.state;
        const showreturnKeyTypeObj = showReturnKeyType
            ? { returnKeyType: returnKeyMode }
            : {};
        return (
            <React.Fragment>
                <View style={textInputWrapStyle}>

                    <View style={textInputViewStyle}>
                        {this.checkIfLabelExist() && !useSVGImage && (
                            <View
                                style={[labelIconStyle, { ...leftLabelIconStyle }]}
                            >
                                <Image
                                    iconHeight={12}
                                    iconImage={labelIconPath}
                                    iconWidth={12}
                                    imageResizeMode="contain"
                                    styling={{
                                        bottom: -1,
                                        ...leftIconStyling,
                                    }}
                                />
                            </View>
                        )}

                        {labelText ? (
                            <Text style={labelStyle}>
                                {`${labelText} `}
                                {showMandatory && !this.props.hideAsterisk ? (
                                    <Text style={manatoryField}>*</Text>
                                ) : null}
                            </Text>
                        ) : null}
                        <View
                            pointerEvents={editable ? 'auto' : 'none'}
                            style={innerTextWrapStyle}
                        >
                            <TextInput
                                // {...dynamicProps}
                                contextMenuHidden={contextMenuHidden ? true : false}
                                {...showreturnKeyTypeObj}
                                ref={refer => {
                                    this.inputTextReferer = refer;
                                    getInputRefer(refer);
                                }}
                                autoCapitalize={autoCapitalize}
                                autoCorrect={false}
                                editable={editable}
                                keyboardType={
                                    !!keyboardType ? keyboardType : returnKeyType
                                }
                                maxLength={maxLength}
                                minlength={minlength}
                                onBlur={this.handleBlur}
                                onChangeText={(text) => this.onTextChanged(text,id)}
                                onFocus={this.handleFocus}
                                onSubmitEditing={onSubmitEditing}
                                placeholder={placeholder}
                                placeholderTextColor={placeholderTextColor}
                                secureTextEntry={secureTextEntry && !showPassword}
                                selectionColor={selectionColor}
                                spellCheck={false}
                                style={inputStyle}
                                underlineColorAndroid="transparent"
                                value={inputValue}
                            />
                        </View>
                    </View>
                    {renderClearBtn && showClearBtn && (
                        <TouchableWithoutFeedback
                            onPress={() => this.onCancelBtnClick(id)}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        >
                            <View style={[clearBtnWrap]}>
                                <Text
                                    style={[
                                        clearBtnStyle,
                                        {
                                            backgroundColor: clearBtnBgColor,
                                            color: clearBtnTxtColor,
                                            textAlign: 'center'
                                        },
                                        showClearBtn
                                            ? { display: 'flex' }
                                            : { display: 'none' },
                                    ]}
                                >
                                    X
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    {this.checkIfIconExist() && (
                        <View style={[rightIconStyle,customeRightIconStyle]}>
                            {rightIconText ? (
                                <Text style={rightIconTextStyle}>
                                    {rightIconText}
                                </Text>
                            ) : null}

                            <Image
                                style={{
                                    height:RfH(24),
                                    width:RfW(24)
                                }}
                                resizeMode={'contain'}
                                source={rightIconPath}
                               
                                // styling={{
                                //   transform: [{ scaleX: isRightToLeft ? -1 : 1 }],
                                // }}
                                submitFunction={rightIconClickListener}
                            />

                        </View>
                    )}


                    {icEye && showClearBtn && (
                        <TouchableWithoutFeedback
                            onPress={() => this.changePwdType()}
                        >
                            <View style={[rightIconStyle, clearBtnWrap]}>
                                <Image
                                   
                                    source={eyeIconSource}
                                
                                    style={[eyeBtnStyle, eyeIconStyle]}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
                {validateFields && !isNocForm &&
                    !this.state.isActive &&
                    isbuttonPressed && (
                        <View style={[isRightToLeft && alignTextRight, {
                        }]}>
                            {!inputValue ? (
                                <Text style={errorTextStyle}>
                                    {!this.state.isActive &&
                                        strings.PLEASE_ENTER +
                                        ' ' +
                                        (emptyErrorText ? emptyErrorText : labelText)}

                                </Text>
                            ) : (
                                <React.Fragment>
                                    {errorText ? (
                                        <Text style={errorTextStyle}>
                                            {!this.state.isActive && errorText}
                                        </Text>
                                    ) : (
                                        <View />
                                    )}
                                </React.Fragment>
                            )}
                        </View>
                    )}

                {isbuttonPressed && isNocForm && (
                    <View style={[isRightToLeft && alignTextRight, {
                        paddingTop: RfH(4)
                    }]}>
                        {!inputValue && showMandatory && (
                            <Text style={errorTextStyle}>
                                {!this.state.isActive &&
                                    strings.PLEASE_ENTER +
                                    ' ' +
                                    (emptyErrorText ? emptyErrorText : labelText)}  {showMandatory}
                            </Text>)}
                    </View>
                )

                }

            </React.Fragment>
        );
    }
}

