import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Modal, ImageBackground, ScrollView, FlatList, Image, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

import { CustomText, InlineHomeTabs, Header, ListEmptyComponent } from '../../components';
import imagePath from '../../constants/imagePath';
import { Height, RfH, RfW, Width } from '../../utils/helpers';
import { StoryList, ChatListItems, CallsListItems, FriendListItems, RenderHiddenItem, FriendList } from './components'
import * as Animatable from 'react-native-animatable';
import { SwipeListView } from 'react-native-swipe-list-view';
import navigationStrings from '../../constants/navigationStrings';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/actions';
import { localize } from '../../constants/lang';
import { api } from '../../utils/api';
import { commonGetCaptcha, getUserStoriesApi, getWindowChatAPI } from '../../utils/url';
import { getUserLoginDataSelector } from '../../redux/selectors/profile';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
const stateSelector = createStructuredSelector({
  userData: getUserLoginDataSelector,
})
const HomeScreen = ({ navigation }) => {
  const { userData } = useSelector(stateSelector)
  const dispatch = useDispatch()
  const callRef = useRef()
  const chatRef = useRef()
  const friendsRef = useRef()
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [isChatListEnd, setIsChatListEnd] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [chatListArray, setChatListArray] = useState([])
  const [chatRowOpen, setChatRowOpen] = useState(-1)
  const { top } = useSafeAreaInsets();
  const [swipeDirection,setSwipeDirection] = useState(null)

  const [activeButton, setActiveButton] = useState({
    name: 'Chat', id: 1,
    activeImage: imagePath?.ic_chat,
    inActiveImage: imagePath?.ic_chat_gray
  })
  const [buttonsArray, setButtonArray] = useState([{
    name: 'Chat', id: 1,
    activeImage: imagePath?.ic_chat,
    inActiveImage: imagePath?.ic_chat_gray

  }, {
    name: 'Calls', id: 2,
    activeImage: imagePath?.ic_calls,
    inActiveImage: imagePath?.ic_calls_gray
  }, {
    name: 'Friends', id: 3,
    activeImage: imagePath?.ic_friends,
    inActiveImage: imagePath?.ic_friends_gray
  }
  ])

  const [storyLimit, setStoryLimit] = useState(20)
  const [storySkip, setStorySkip] = useState(0)
  const [storyListing, setStoriesList] = useState({})
  useEffect(() => {
    dispatch(getUserProfile({}))
  }, [])

  {/**************** Stories Api  Function *********************/ }
  useEffect(() => {
    getUserStoriesCall()
  }, [])

  const getUserStoriesCall = async () => {
    try {
      const resposne = await api({
        method: 'GET',
        url: `${getUserStoriesApi}?limit=${storyLimit}&skip=${storySkip}`,
      });
      if (resposne?.success) {
        const { data } = resposne?.data
        if (data && data?.listing.length > 0) {
          if (storySkip > 0) {
            setStoriesList({
              storyCount: data?.count,
              storyListing: [...data?.listing, ...storyListing?.listing]
            })
          } else {
            setStoriesList({
              storyCount: data?.count,
              storyListing: data?.listing
            })
          }
        } else {
          console.log('End Story fetch')
        }

      }
    } catch (error) {
    }
  }


  {/**************** Chat Api  Function *********************/ }
  useEffect(() => {
    getWindowChatAPICall()
  }, [])
  useEffect(() => {
    getWindowChatAPICall()
  }, [skip])


  const getWindowChatAPICall = async () => {
    try {
      const resposne = await api({
        method: 'GET',
        url: `${getWindowChatAPI}?limit=${limit}&skip=${skip}`,
      });
      if (resposne?.success) {
        const { data } = resposne?.data
        console.log(data, "datadatadatadatadatadata")

        if (data && data.length > 0) {
          if (skip > 0) {
            setChatListArray([...chatListArray, ...data])
            setIsRefreshing(false)
          } else {
            setChatListArray(data)
            setIsRefreshing(false)
          }
        } else {
          setIsChatListEnd(true)
          setIsRefreshing(false)
        }

      }
    } catch (error) {
    }
  }
  const fetchMoreChatWindowData = () => {
    if (!isChatListEnd) {
      setSkip(skip + limit)
    }
  }

  {/**************** Swipeble List *********************/ }
  const changeTab = (item) => {
    setActiveButton(item)
    if (item?.id == 1 && chatRef && chatRef?.current) {
      chatRef.current.slideInLeft(400)
    } else if (item?.id == 2 && callRef && callRef?.current) {
      callRef.current?.slideInLeft(400)
    } else if (item?.id == 3 && friendsRef && friendsRef?.current) {
      friendsRef?.current?.slideInLeft(400)
    }
  }

  const onRowOpen = rowKey => {
    setChatRowOpen(rowKey)
  };

  const renderFooter = () => (
    <View style={styles.footerText}>
      {!isChatListEnd && <ActivityIndicator />}

    </View>
  )
  const renderChatList = () => {
    return <View
      style={{
        flex: 1,
        paddingTop: RfH(12), paddingHorizontal: RfW(16)
      }}>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={chatListArray}
        style={{
          flex: 1
        }}
        keyExtractor={(item, index) => index + 'chatindex'}
        renderItem={({ item, index }) => <ChatListItems
          onPress={() => navigation.navigate(navigationStrings.CHAT_SCREEN,{
            data:item
          })}
          isSelectedRow={`${index}chatindex` == chatRowOpen ? true : false}
          item={item}
          index={index}
          chatRowOpen={chatRowOpen}
          user={userData}
        />}
        refreshing={isRefreshing}
        onRefresh={() => {
          setSkip(0)
          setIsRefreshing(true)
        }}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />
        }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        // onSwipeValueChange={(data)=>{
        //   setSwipeDirection(data)
        // }}  
        onEndReached={() => fetchMoreChatWindowData()}
        renderHiddenItem={(data, rowMap) => (
          `${data?.index}chatindex` == chatRowOpen ? <RenderHiddenItem
            data={data}
            rowMap={rowMap}
            swipeDirection={swipeDirection}
            isSelectedRow={`${data?.index}chatindex` == chatRowOpen ? true : false}
            rowKey={chatRowOpen}
          /> : <View />
        )}

        leftOpenValue={120}
        rightOpenValue={-140}
        previewRowKey={'0'}
        previewOpenValue={-10}
        previewOpenDelay={100}
        onRowOpen={(rowKey, rowId) => {
          setChatRowOpen(rowKey)

        }}
      />
    </View>
  }


  const renderCallsList = () => {
    return <View
      style={{ paddingTop: RfH(24), paddingHorizontal: RfW(16) }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[]}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />
        }}
        keyExtractor={(item, index) => index + 'chatindex'}
        renderItem={({ item, index }) => <CallsListItems
        />}
      />
    </View>
  }



  return (
    <>
      <View
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, }} >

        <View style={{
          backgroundColor: 'white',
          flexGrow: 0,
          height:RfH(176),
        }}>

          <Header
            title={'Let’s Talk'}
            onBackPress={() => {
              navigation.openDrawer()
            }
            }
            isRighImageBackground
            leftImage={imagePath?.ic_drawr}
            // rightImage={imagePath?.ic_search_white}
            rightImage1={imagePath?.editTim}
            customMainHeadContainer={{
              flex: 0,

            }}
          />
        <View style={{
            top:-RfH(44),
            paddingHorizontal:RfW(8)
          }}>
            <StoryList
              storyListing={storyListing}
            />
          </View>

          {/**************** Header  *********************/}

        </View>

        {/**************** Inline Tab Header  *********************/}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: '#ffffff' }}>
         
          <InlineHomeTabs
            customeStyle={{
              marginTop: RfH(12),
              marginBottom: RfH(4),
            }}

            activeButton={activeButton}
            buttonsArray={buttonsArray}
            setActiveButton={(item) => changeTab(item)}
          />
          {/**************** CHAT FLOW  *********************/}
          <Animatable.View
            ref={chatRef} >
            {activeButton?.id == 1 && renderChatList()}
          </Animatable.View>
          <Animatable.View
            ref={callRef} >
            {activeButton?.id == 2 && renderCallsList()}
          </Animatable.View>
          <Animatable.View
            ref={friendsRef} >
            {activeButton?.id == 3 && <FriendList
              navigation={navigation}
            />}
          </Animatable.View>
        </ScrollView>
      </View>

    </>

  );
};
export default React.memo(HomeScreen);
