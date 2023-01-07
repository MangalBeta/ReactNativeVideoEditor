import {Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';

import PropTypes from 'prop-types';
import {map} from 'lodash';
import styles from './styles';
import { localize } from '../../constants/lang';
import { FlatList } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

function ActionSheet(props) {
    const { isVisible, handleCancel, cancelText, topLabel, actions, isTopLabelVisible, selectedIndex,selectedLang} = props;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleCancel}>
            <TouchableWithoutFeedback onPress={handleCancel}>
                <View style={styles.mainModalContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalInnerContainer}>
                        {isTopLabelVisible &&<Text style={styles.modalTopLabel}>{topLabel}</Text>}
                                <FlatList
                                keyExtractor={(item,index)=> 'index_country'+index}
                                data={actions && map(actions.filter(action=>action.label)) }
                                renderItem={({item,index}) =>{
                                    console.log(item,"item",selectedLang)
                                    let isSelected = selectedLang !== null && selectedLang === item?.lang
                                    return <View key={index} 
                                    style={[selectedLang !== null && selectedLang === item?.lang && {
                                        backgroundColor:'rgba(0,0,0,0.05)'
                                    }]}
                                    >
                                    <View style={styles.modalSeparator} />
                                    <TouchableOpacity activeOpacity={0.4}
        
                                         onPress={()=>item?.handler(index,item?.lang)}>
                                        <Text style={[styles.modalActionLabel, item.labelColor && {
                                            
                                            color:item.labelColor},
                                            isSelected && {
                                                fontWeight:'600',
                                                fontSize:22
                                            }
                                            
                                            ]}>
                                            {selectedLang !== null && selectedLang === item?.lang ? <Text> ✓  </Text> : null}
                                            {item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                                }}
                                />
                        </View>
                        <View style={styles.modalDismissContainer}>
                            <Text style={styles.modalLabelDismiss} onPress={handleCancel}>{cancelText}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

ActionSheet.propTypes = {
    isVisible: PropTypes.bool,
    handleCancel: PropTypes.func,
    cancelText: PropTypes.string,
    topLabel: PropTypes.string,
    actions:PropTypes.array,
    isTopLabelVisible: PropTypes.bool,
    selectedIndex: PropTypes.number,
};
ActionSheet.defaultProps = {
    isVisible: false,
    handleCancel: null,
    cancelText: localize('common.cancelS'),
    topLabel:localize('components.actionSheet.actions'),
    actions:[],
    isTopLabelVisible:true,

};
export default ActionSheet;
