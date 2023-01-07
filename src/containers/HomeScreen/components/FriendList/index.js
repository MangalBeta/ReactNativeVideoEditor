{/************  FIVVIA Friend List VIEW *************/ }

import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, Platform, PermissionsAndroid, View, Image } from 'react-native';
import imagePath from '../../../../constants/imagePath';
import FastImage from 'react-native-fast-image';
import Contacts, { addContact, updateContact } from 'react-native-contacts';
import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW, Width } from '../../../../utils/helpers';
import { CustomText, ListEmptyComponent } from '../../../../components';
import styles from './styles';
import moment from 'moment';
import FriendListItems from '../CallChatWrapper/friendsListItems';
import GroupListItem from '../GroupList/groupListItem'
import { isEmpty } from 'lodash';
import { api } from '../../../../utils/api';
import { getUserGroup, getWindowChatAPI } from '../../../../utils/url';
import { FriendsTabs, GroupsListData } from '../../../../constants/constants';
import GroupListModal from '../GroupList/groupListModal';
import FollowFollowingItems from '../FollowFollowing';
import GroupTermsModal from '../GroupList/groupTermsModal';

const FriendList = ({navigation}) => {
    const [activeFriendTabIndex, setActiveFriendTabIndex] = useState(0)
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [friendsTabs, setFriendTabs] = useState(FriendsTabs)
    const [isSelectedGroupData, setSelectedGroupData] = useState({
        isVisible: false,
        data: null
    })
    useEffect(() => {
        async function fetchData() {
            const response = await requestPermissionsAsync();
        }
        fetchData()
    }, [])

    const requestPermissionsAsync = () => {
        try{
            if (Platform.OS === "android") {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                    title: "Contacts",
                    message: "This app would like to view your contacts."
                }).then(() => {
                    loadContacts();
                }).catch((error) => {
                    console.log(error, "errorerrorerror")
                });
            } else {
                loadContacts();
            }
        }catch(error){
            console.log(error,"error in contact list")
        }
       
    }
    const loadContacts = () => {
        try {
            Contacts.getAll()
                .then(contacts => {
                    setLoading(false)
                    setContacts(contacts)
                    console.log(contacts, "contactscontacts")
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setLoading(false)
                });
            Platform.OS == 'ios' && Contacts.checkPermission();
        } catch (error) {
            console.log(error,"loadContacts")
        }

    }

    const addNewContacts = () => {
        try {
            let newPerson = {}
            Contacts.openContactForm(newPerson).then(contact => {
                if (!isEmpty(contact)) {
                    setContacts([contact, ...contacts,])
                }
            })
        } catch (error) {
            console.log('error', JSON.stringify(error))
        }

    }


    const renderContactsView = () => {
        return <><View style={styles.newContactContainer}>
            <Pressable
                onPress={() => addNewContacts()}
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
                    Add New Contact
                </CustomText>
                <View >
                    <Image source={imagePath?.ic_qr} />
                </View>
            </View>
        </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={contacts}
                ListEmptyComponent={() => {
                    return <ListEmptyComponent />
                }}
                keyExtractor={(item, index) => index + 'contacts'}
                renderItem={({ item, index }) => <FriendListItems
                    index={index} item={item}
                />}
            />
        </>
    }

    const renderGroupsView = () => {
        return <>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={GroupsListData}
                ListEmptyComponent={() => {
                    return <ListEmptyComponent />
                }}
                keyExtractor={(item, index) => index + 'contacts'}
                renderItem={({ item, index }) => <GroupListItem item={item}
                    onPressItem={() => {
                        setSelectedGroupData({
                            isVisible: true,
                            data: item
                        })
                    }}
                    index={index} />}
            />
        </>
    }

    const renderFollowFollowingView = () => {
        return <FollowFollowingItems
            urlName={friendsTabs?.[activeFriendTabIndex]?.type}
            activeFriendTabIndex={activeFriendTabIndex} />
    }
    return <View
        style={styles.friendListCon}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={friendsTabs}
            keyExtractor={(item, index) => 'contact' + index}
            renderItem={({ item, index }) => {
                return <View><Pressable
                    onPress={() => setActiveFriendTabIndex(index)}
                    style={[{
                        paddingHorizontal: RfW(8),
                        justifyContent: 'center', alignItems: 'center'
                    }, activeFriendTabIndex == index && styles.activeFriendTabStyle]}
                >
                    <CustomText
                        fontWeight='bold'
                        fontSize={14}
                        color={activeFriendTabIndex !== index ? 'rgba(40, 38, 38, 0.5)'
                            : '#282626'}
                        styling={{ lineHeight: 24 }}
                    >
                        {item?.name} {item.id == 1 && `(${contacts.length})`}
                    </CustomText>
                </Pressable>
                </View>
            }}
        />
        {activeFriendTabIndex == 0 && renderContactsView()}
        {activeFriendTabIndex == 1 && renderGroupsView()}
        {(activeFriendTabIndex == 2 || activeFriendTabIndex == 3 || activeFriendTabIndex == 4) && renderFollowFollowingView()}
        {isSelectedGroupData?.isVisible && <GroupListModal
            isVisible={isSelectedGroupData?.isVisible}
            data={isSelectedGroupData?.data}
            navigation={navigation}
            activeFriendTabIndex={activeFriendTabIndex}
            modalTitle={isSelectedGroupData?.data?.name}
            onCloseActionSheet={() => setSelectedGroupData({
                isVisible: false,
                data: null
            })}

        />}

    </View >
}
export default FriendList