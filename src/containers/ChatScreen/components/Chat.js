import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import socket from 'socket.io-client/lib/socket';
import colors from '../../../constants/colors';
import { CHAT_CONSTANT, LOCALSTORAGE_DATA_KEY, messagesDummyData } from '../../../constants/constants';
import { getUserLoginDataSelector } from '../../../redux/selectors/profile';
import { decryptData, encryptData, getSaveData, RfH } from '../../../utils';
import { api } from '../../../utils/api';
import { getChatOfParticularUser } from '../../../utils/url';

import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputToolBar';
import {
  renderMessage,
} from './MessageContainer';
import ReactionsModal from './ReactionModal';
import socketio from "socket.io-client";

const stateSelector = createStructuredSelector({
  userData: getUserLoginDataSelector,
})
const Chats = ({ navigation, route ,setUserTyping}) => {
  const { userData } = useSelector(stateSelector)
  const paramData = route?.params?.data
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState('');
  const [isReaction, setIsReaction] = useState(false);
  const receiverUser = route?.params?.data
  const [isVisible, setIsVisible] = useState(false)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [chatListArray, setChatListArray] = useState([])
  const [isChatListEnd, setIsChatListEnd] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isReplymsg, setIsReplymsg] = useState(false)
  const [previewFiles, setPreviewFiles] = useState([])
  const [soketConnect, setSocketConnect] = useState(null)
  useEffect(() => {
    getChatForParticularAPICall()
    initSocket()
  }, [])

  /********************* Socket JS **************************/
  const initSocket = async () => {
    try {
      let token = await getSaveData(LOCALSTORAGE_DATA_KEY.USER_TOKEN)
      let query = `token=${token}&id=${userData?._id}`
      let socketRef;
      socketRef = socketio.connect('https://socket.fivvia.com/', { query: query, transports: ['websocket'], secure: true });
      socketRef.on('connect', (con) => {
        console.debug('SOCKET: Connect', socketRef);
        setSocketConnect(socketRef)

      });
      socketRef.on('error', (err) => {
        console.log('SOCKET: errors ', err);
      });
      socketRef.on('connect_error', (err) => {
        console.log('SOCKET: connect_error ---> ', err);
      });
      socketRef.on('messageFromServer', (response) => {
        if (response) {
          let listData = makeMessagesListData([response])
          setMessages((prevMessages) => GiftedChat.append(prevMessages, listData));
        }
      })
      socketRef.on('Typing', (response) => {
        if(response){
          setUserTyping(response)
          setTimeout(()=>setUserTyping(null),1200)
        }
      })

    } catch (error) {
      console.debug('CATCH: SOCket Error ---> ', error);
    }
  }

  const checkURL = (data, url) => {
    return url
  }
  const makeText = async (message) => {

    if (!text && previewFiles.length == 0) {
      return false;
    }
    let data = {};
    data.text = text;
    data.size = text.length;
    data.type = 'TEXT';
    data.loading = true;
    data.uid = Math.random().toString(36).substr(2, 15);
    data.senderId = userData._id;
    data.conversationId = paramData?.conversationId;
    if (isReplymsg) {
      data.isReply = true;
      data.replyIdType = isReplymsg?.replyIdType ? isReplymsg?.replyIdType : 'REPLY';
      if (data.replyIdType == 'GROUPREPLY') {
      }
      data.userId = isReplymsg?.userId?._id;
      data.replyId = isReplymsg?._id;
      data.replyObject = isReplymsg;
      data.replyObject.replySender = isReplymsg?.userId;
    }

    var urls = [];
    urls = text.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
    // console.log(urls);
    if (urls) {
      if (urls.length > 0) {
        let url = urls[0];
        if (url.match(CHAT_CONSTANT.IMAGE_EXT)) {
          data.type = 'IMAGE';
          data.image = {};
          data.image.original = url;
          data.image.thumbnail = url;
          data.image.mediaType = 'IMAGE';
        } else
          if (url.match(CHAT_CONSTANT.VIDEO_EXT)) {
            data.type = 'VIDEO';
            data.image = {};
            data.image.original = url;
            data.image.thumbnail = url;
            data.image.mediaType = 'VIDEO';
          } else {
            data = await checkURL(data, url);
          }
      }
    }
    if (previewFiles && previewFiles.length > 0) {
      data.type = 'ARRAY';
      data.images = previewFiles;
    }
    let data1 = JSON.parse(JSON.stringify(data));
    // this.messages.push(data1);
    data.text = encryptData(text, userData._id);
    setText('')
    data = JSON.parse(JSON.stringify(data));
    if (soketConnect) {
      sendMessage(data, message)
    }

  }

  const onSend = (newMessages = []) => {
    makeText(newMessages)
  };

  const onSetReaction = (status) => {
    setIsReaction(status)
  }

  
  const sendTyping = (text,props)=>{
    console.log(text,"texttext",paramData)
    if(soketConnect){
      let data = {
        "type": "typing",
        "receiverId": paramData?.userId?._id,
        "conversationId":paramData?.conversationId,
        "senderId":userData?._id,
        "sender": {
            "_id": userData?._id,
            "name": userData?.fullName
        }
    }
    setText(text)
      soketConnect.emit('sendTyping', data, (response) => {
        console.log(response, "sendTyping===== Response")
      })
    }
  }
  const sendMessage = (data, message) => {
    let currentConversation = message?.[0]
    let input = {};
    input = JSON.parse(JSON.stringify(data));
    input.text = data?.text;
    input.emoji = data.text.match(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug) ? true : false;
    input.receiverId = currentConversation?.userId?._id;
    input.conversationId = currentConversation?.conversationId;
    input.conversationType = currentConversation?.type || 'SINGLE_CHAT';
    input.senderId = userData?._id
    input.userId = {
      _id: userData._id,
      profilePicURL: userData.profilePicURL,
      userName: userData.userName,
      fullName: userData.fullName,
    }
    if (currentConversation?.groupId) {
      input.groupId = currentConversation.groupId;
      delete input.receiverId;
    }
    input.image = userData?.profilePicURL?.thumbnail || 'assets/images/user.svg';
    input.title = userData?.userName;
    if (currentConversation?.groupId) {
      input.image = currentConversation?.userId?.profilePicURL?.thumbnail;
      input.title = currentConversation.userId?.fullName + '->' + userData?.userName;
    }
    soketConnect.emit('sendMessage', data, (response) => {
      console.log(response, "sendMessagesendMessagesendMessage")
    })
  }

  const makeMessagesListData = (array) => {
    if (array && array.length > 0) {
      return array.map((x) => {
        return {
          ...x,
          _id: x?._id,
          text: decryptData(x?.text, x?.senderId),
          user: {
            _id: x?.userId?._id,
            name: x?.userId?._fullName,
            avatar: x?.userId?.profilePicURL?.thumbnail
          },
        }
      })
    }
  }
  /********************* Socket JS END **************************/
  const getChatForParticularAPICall = async () => {
    try {
      const payload = { conversationId: receiverUser?.conversationId }
      const resposne = await api({
        method: 'POST',
        url: `${getChatOfParticularUser}?limit=${limit}&skip=${skip}`,
        data: payload
      });
      if (resposne?.success) {
        const { data } = resposne?.data
        if (data && data.length > 0) {
          const updatedResponse = makeMessagesListData(data).reverse()
          console.log()
          if (skip > 0) {
            setMessages([...messages, ...updatedResponse])
            setIsRefreshing(false)
          } else {
            setMessages(updatedResponse)
            setIsRefreshing(false)
          }
        } else {
          setIsChatListEnd(true)
          setIsMoreLoading(true)
          setIsRefreshing(false)
        }

      }
    } catch (error) {
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={(text,props)=>{
          sendTyping(text,props)
        
        }}
        onSend={onSend}
        user={{
          _id: userData?._id,
          name: userData?.userName,
          avatar: userData?.profilePicURL?.thumbnail
        }}
        alignTop
        alwaysShowSend
        scrollToBottom
        showsVerticalScrollIndicator={false}
        showUserAvatar={false}
        renderAvatarOnTop
        renderUsernameOnMessage
        bottomOffset={25}
        minInputToolbarHeight={56}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderBubble={null}
        renderAvatar={null}
        renderMessage={(props) => renderMessage(props, onSetReaction, isReaction)}
        // isCustomViewBottom
        messagesContainerStyle={{ backgroundColor: 'transparent' }}
        parsePatterns={(linkStyle) => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
        textStyle={{
          paddingTop: RfH(6)
        }}
        textInputProps={{
          style: {
            borderColor: '#FFFFFF',
            width: '75%',
            height: RfH(48),
            fontSize: 16,
            color: '#222B45',
            paddingTop: 12,
            textAlignVertical: 'center'

          }
        }}
      />

      <ReactionsModal
        onCloseActionSheet={() => onSetReaction(false)}
        isVisible={isReaction} />

    </View>
  );
};

export default Chats;