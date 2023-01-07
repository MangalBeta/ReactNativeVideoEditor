{/************  FIVVIA STORY VIEW *************/ }

import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Animated, Modal, TouchableOpacity, View, Image } from 'react-native';
import imagePath from '../../../../constants/imagePath';
import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW } from '../../../../utils/helpers';
import { CustomText } from '../../../../components';
import * as Animatable from 'react-native-animatable';

import styles from '../../../Signup/styles';
import StoryViewContainer from './storyContainer';
import { useNavigation } from '@react-navigation/core';
import navigationStrings from '../../../../constants/navigationStrings';

const modifyStoryDataResponse = (data) => {
  return data.map((item, index) => {
    return {
      id: item?._id,
      type: item?.type,
      url: item?.story?.original,
      duration: item?.story?.duration,
      isNew: true,
      created: item?.createdAt,
      ...item
    }
  })
}
const addData = [{ _id: 0, username: 'You' }];

const modifyStoryListingResponse = (data) => {
  if (data && data.length > 0) {
    const updatedResponse = data.map((item, index) => {
      return {
        username: item?.userId?.fullName,
        title: "Title story",
        profile: item?.userId?.profilePicURL?.thumbnail,
        stories: modifyStoryDataResponse(item?.storyData),
        ...item
      }
    })
    return [...addData, ...updatedResponse]
  } else {
    return addData
  }

}
const StoryList = ({ storyListing }) => {

  const navigation = useNavigation()

  useEffect(() => {
    const modifyListing = modifyStoryListingResponse(storyListing?.storyListing)
    setListData(modifyListing)
  }, [storyListing])

  const [listData, setListData] = useState([])
  const [isStoryView, setIsStoryView] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const zoomRef = useRef()

  const onStoryClick = () => {
    if (zoomRef?.current) {
      zoomRef.current?.bounceIn(400)
    }
  }
  const renderImageCircle = (item) => {
    if (item?._id == 0) {
      return <Image
        source={imagePath.ic_plus_small}
        resizeMode={'cover'}
      />
    } else {
      return <Image
        style={{
          borderRadius: RfH(48) / 2,
          height: '100%', width: '100%'
        }}
        source={{ uri: item?.profile }}
        resizeMode={'cover'}
      />
    }

  }
  return <View style={{
    justifyContent: 'center'
  }}>
    <FlatList
      data={listData}
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={(item,index) => index+'stortyListInex'}
      renderItem={({ item, index }) => {
        return <View style={styles.storyMainView}>
          <TouchableOpacity
            onPress={() => {
              if (item?._id !== 0) {
                setIsStoryView(true)
                setCurrentStoryIndex(index)
                onStoryClick()
              } else {
                navigation.navigate(navigationStrings.ADD_STORY_SCREEN)
              }

            }}
            style={styles.storyBtnView}>
            <Animatable.View
              ref={zoomRef}
              style={styles.storyInnerBtnView}>
              {renderImageCircle(item)}
            </Animatable.View>
          </TouchableOpacity>
          <View style={{ marginTop: RfH(8) }}>
            <CustomText
              color={'#000000'}
              fontSize={10}
              fontWeight={'600'}
            >
              {item?.username}
            </CustomText>
          </View>
        </View>
      }}
    />

    {isStoryView && <StoryViewContainer
      visible={isStoryView}
      currentStoryIndex={currentStoryIndex}
      onCloseStory={() => setIsStoryView(false)}
      data={listData.filter(x => x?.id != 0)}
    />}


  </View>
}
export default StoryList