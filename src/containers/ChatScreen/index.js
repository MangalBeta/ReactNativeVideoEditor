import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Modal, ImageBackground, ScrollView, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

import { CustomText, InlineHomeTabs, Header, ChatHeader } from '../../components';
import imagePath from '../../constants/imagePath';
import { Height, RfH, RfW, Width, getSaveData } from '../../utils/helpers';
import { StoryList, ChatListItems, CallsListItems, FriendListItems, RenderHiddenItem } from './components'
import * as Animatable from 'react-native-animatable';
import { SwipeListView } from 'react-native-swipe-list-view';
import navigationStrings from '../../constants/navigationStrings';
import commonStyles from '../../themes/commonStyles';
import { Chat } from './components'
import colors from '../../constants/colors';
import RenderActionSheetModal from './components/ActionSheetModal';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getUserLoginDataSelector } from '../../redux/selectors/profile';
import { createStructuredSelector } from 'reselect';
import { LOCALSTORAGE_DATA_KEY } from '../../constants/constants';
const stateSelector = createStructuredSelector({
    userData: getUserLoginDataSelector,
})
const ChatScreen = ({ navigation, route }) => {
    const { userData } = useSelector(stateSelector)
    const [isVisible, setIsVisible] = useState(false)
    const paramData = route?.params?.data
    const [userTyping,setUserTyping] = useState(null)
    console.log(userTyping,"userTypinguserTyping")
    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ flex: 1, }}>
                    {/**************** Header  *********************/}
                    <View
                        style={styles.headerHeight}>
                        <ChatHeader
                            title={paramData?.userId?.fullName}
                            onBackPress={() => {
                                navigation.goBack()
                            }
                            }
                            userTyping={userTyping?.conversationId ==paramData?.conversationId ? 
                                userTyping: null
                            }
                            profileImage={paramData?.userId?.profilePicURL?.thumbnail}
                            subTitle={paramData?.userId?.userName}
                            chatUser={paramData}
                            isChatHeader={true}
                            leftImage={imagePath?.ic_back_black}
                            rightImage1={imagePath?.ic_audio_call_chat}
                            rightImage2={imagePath?.ic_more_chat}
                            rightImage={imagePath?.ic_video_call_chat}
                            onRightImage2Press={() => setIsVisible(true)}
                            customMainHeadContainer={styles.mainCustomHeader}
                        />
                    </View>
                    <ImageBackground
                        style={{
                            flex: 1,
                            height: '100%', width: '100%'
                        }}
                        resizeMode={'cover'}
                        source={imagePath?.ic_bg_chat_screen}>
                        <Chat
                            navigation={navigation}
                            route={route}
                            setUserTyping={setUserTyping}
                        />
                    </ImageBackground>

                    {isVisible && <RenderActionSheetModal
                        isVisible={isVisible}
                        onCloseActionSheet={() => setIsVisible(false)}
                    />}
                </View>
            </SafeAreaView>
        </>

    );
};
export default React.memo(ChatScreen);
