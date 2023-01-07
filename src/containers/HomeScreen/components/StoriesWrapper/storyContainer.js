
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native'
import StoryContainer from './storyContainerWrapper';
const { CubeNavigationHorizontal } = require("react-native-3dcube-navigation");


const StoryViewSlider = (props) => {
  const { visible,currentStoryIndex } = props
  const [isModelOpen, setModel] = useState(props?.visible);
  const [currentUserIndex, setCurrentUserIndex] = useState(currentStoryIndex);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);  


  useEffect(() => {
    setModel(visible)
  }, [visible])

  useEffect(()=>{
    setCurrentUserIndex(currentStoryIndex);
  },[currentStoryIndex])

 
  const onStoryClose = () => {
    setModel(false);
    props.onCloseStory()
  };
  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (props.data.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        //erro aqui
        try {
          modalScroll.current.scrollTo(newIndex, true);
        } catch (e) {
          console.warn("error=>", e);
        }
      }
    } else {
      setModel(false);
      props.onCloseStory()
    }
  };


  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    console.log(scrollValue,"scrollValuescrollValue",currentScrollValue)
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      console.log("next");
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      console.log("previous");
      setCurrentScrollValue(scrollValue);
    }
  };
  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            if(modalScroll?.current){
              modalScroll?.current?.scrollTo(0, false);
            }
          }
        }}
        onRequestClose={onStoryClose}
      >
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}
        >
          {props.data.map((item, index) => (
            <StoryContainer
              key={item?.title}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              dataStories={item}
              isNewStory={index !== currentUserIndex}
              textReadMore={false}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
}
export default StoryViewSlider

const styles = new StyleSheet.create({
  boxStory: {
    marginLeft: 15,
  },
  ItemSeparator: { height: 1, backgroundColor: "#ccc" },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,255)",
    paddingBottom: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  superCircle: {
    borderWidth: 3,
    borderColor: "blue",
    borderRadius: 60,
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 8,
    textAlign: "center",
  },
});