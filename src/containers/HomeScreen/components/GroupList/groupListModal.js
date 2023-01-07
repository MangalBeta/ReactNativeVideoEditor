import React, { useEffect, useState } from 'react';
import { Image, Pressable, FlatList, View, ActivityIndicator, ImageBackground } from 'react-native';
import { CustomText, Header, ListEmptyComponent, Loader } from '../../../../components';
import Modal from 'react-native-modal';
import { BlurView } from "@react-native-community/blur";
import styles from './styles';
import imagePath from '../../../../constants/imagePath';
import { RfH, RfW } from '../../../../utils';
import { localize } from '../../../../constants/lang';
import CallsListItems from '../CallChatWrapper/callsListItems';
import GroupListSubItem from './groupListSubItem';
import { api } from '../../../../utils/api';
import { getUserGroup } from '../../../../utils/url';
import GroupTermsModal from './groupTermsModal';
import navigationStrings from '../../../../constants/navigationStrings';

const GroupListModal = ({ data, 
     isVisible,
     onCloseActionSheet,
     modalTitle,
     navigation,
     activeFriendTabIndex }) => {
    const limit = 12
    const [groups, setGroups] = useState([])
    const [groupCount, setGroupCount] = useState(0)
    const [groupSkip, setGroupSkip] = useState(0)
    const [isLoading,setLoading] = useState(false)
    const [isVisibleTerms,setIsVisibleTerms] = useState(false)
    const [selectedGroup,setSelectedGroup] = useState(null)
    useEffect(() => {
        getGroups(0)
    }, [data])


    useEffect(() => {
        if (groupSkip > 0) {
            getGroups(groupSkip)
        }
    }, [groupSkip])


    const getGroups = async (skip = 0) => {
        try {
            if(groupSkip  <=0 ){
                setLoading(true)
            }
            const resposne = await api({
                method: 'GET',
                url: `${getUserGroup}?limit=${limit}&skip=${skip}&type=${data?.type}`,
            });
            if (resposne?.success) {
                setLoading(false)
                const { listing, count } = resposne?.data?.data
                if (listing && listing.length > 0) {
                    if (groupSkip > 0) {
                        setGroups([...groups, ...listing])
                        setGroupCount(count)
                    } else {
                        setGroups(listing)
                        setGroupCount(count)
                    }
                } else {
                    if (count == 0) {
                        setGroups([])
                    }

                }
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const fetchMoredata = () => {
        if (groupCount > groupSkip) {
            setGroupSkip(groupSkip + limit)
        }
    }

    const renderFooter = () => (
        <View style={styles.footerText}>
            {groupCount > 0 && groupCount >= groupSkip && <ActivityIndicator />}
        </View>
    )
    const renderGroups = () => {
        return <View style={{ flex: 1,paddingTop:RfH(8) }}>
            <FlatList
                data={groups}
                renderItem={({ item, index }) => renderGroupListItem(item, index)}
                keyExtractor={(item, index) => 'group' + modalTitle + index.toString()}
                ListEmptyComponent={() => {
                    return <ListEmptyComponent />
                }}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.5}
                onEndReached={() => fetchMoredata()}
            />
        </View>
    }
    const renderGroupListItem = (item, index) => {
        return <View style={{ paddingHorizontal: 16 }}>
            <GroupListSubItem
                item={item}
                onPressItem={()=>{
                    setIsVisibleTerms(true)
                   setSelectedGroup(item)
                }}
                index={index}
            />
        </View>
    }

    const addNewGroup = ()=>{
        return <View style={[styles.newContactContainer,{
            paddingHorizontal:RfW(16)
        }]}>
        <Pressable
            onPress={() => alert('Add')}
            style={{ flex: 0.2 }}>
            <Image source={imagePath?.ic_add_contact} />
        </Pressable>
        <View style={styles.centerNewContactStyle}>
            <CustomText
                fontWeight='bold'
                fontSize={14}
                color={'#4C70FF'}
                styling={{ lineHeight: 24 }}
            >
                Add New Group
            </CustomText>
            <View >
                <Image source={imagePath?.ic_qr} />
            </View>
        </View>
    </View>
    }
    return <Modal
        isVisible={isVisible}
        onSwipeComplete={() => null}
        onBackdropPress={() => null}
        transparent={true}
        backdropColor={'transparent'}
        backdropOpacity={0.0}
        style={styles.modalBackdrop}
    >
       
        <BlurView
            style={styles.blurView}
            blurType="dark"
            blurAmount={10}
            overlayColor={'rgba(255,255,255,0.8)'}
            />
        <View style={{ flex: 1 }} />
         <View style={styles.blurViewContainer}>
            <View style={styles.topHeaderTitle}>
                <Pressable
                    onPress={onCloseActionSheet}
                    hitSlop={{
                        top: 50,
                        bottom: 20,
                        right: 100,
                        left: 100
                    }}
                    style={styles.backIcon}
                >
                    <Image source={imagePath?.ic_back_black} />
                </Pressable >
                <View style={styles.centerTitle}>
                    <CustomText
                        fontSize={16}
                        fontWeight={'bold'}
                        color={'#232323'}

                    >{modalTitle}</CustomText>
                </View>

            </View>
            <View
                style={styles.mainView}
            >
                {addNewGroup()}
                {renderGroups()}
            </View>
        </View>
        <Loader isLoading={isLoading} />
        {isVisibleTerms && <GroupTermsModal
            isVisible={isVisibleTerms}
            data={[]}
            onAccept={()=> {
                onCloseActionSheet(false)
                navigation.navigate(navigationStrings.GROUP_DETAILS_SCREEN,{
                groupData:selectedGroup
            })}}
            modalTitle={'Terms and Condtion'}
            onCloseActionSheet={() =>{
                setIsVisibleTerms(false)
            }}

        />}
    </Modal>


}

export default GroupListModal