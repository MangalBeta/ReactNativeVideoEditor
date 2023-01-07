import React, { useEffect, useState, useCallback } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Button,
    Image,
    Modal,
    Text,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import { Header } from '../../components';
import imagePath from '../../constants/imagePath';
// @ts-ignore: CameraRollExample has no typings in same folder
import CameraRollMain from './components/CameraRoll';
import Video from 'react-native-video';

import { Height, RfH, RfW, Width } from '../../utils';
import { FlatList } from 'react-native-gesture-handler';
const { VideoEditorModule } = NativeModules;
const openEditor = (): Promise<{ videoUri: string } | null> => {
    return VideoEditorModule.openVideoEditor();
};
export const openVideoEditor = async (): Promise<string | null> => {
    const response = await openEditor();

    if (!response) {
        return null;
    }

    return response?.videoUri;
};
async function getAndroidExportResult() {
    return await VideoEditorModule.openVideoEditor();
}
const AddStoryContainer = ({ navigation }) => {
    const [savedVideoList,setVideoSavedVideoList] = useState([])

    useEffect(()=>{
        _onLoadStoryVideo()
    },[])
    const _onLoadStoryVideo = async (item) => {
        if (Platform.OS === 'android') {
            getAndroidExportResult().then(videoUri => {
                     setVideoSavedVideoList([...savedVideoList,videoUri])
               
            }).catch(e => {
                console.log("eeeeeeeee",e)

            })
        } else {
            const videoUri = await openVideoEditor();

        }
    };

    const renderVideoItem = (item) => {
        const imageSize = Width() / 3 - RfW(2);
        const cameraStyle = [{
            backgroundColor: '#222222',
            width: imageSize, height: Height() / 4
        }];
        return (
                    <View
                        style={cameraStyle}>
                        <Video
                            source={{uri:item}}
                            style={cameraStyle}
                            resizeMode={'cover'}
                        />
                    </View>

        );
    };
    const renderVideoList = () => {
        return <FlatList
            data={savedVideoList}
            keyExtractor={(item, index) => index + 'videoList'}
            renderItem={({ item, index }) => renderVideoItem(item, index)}
            numColumns={3}
        />
    }


    return <View style={styles.flex1}>
        {<CameraRollMain navigation={navigation} />}

        {renderVideoList()}

    </View>


}
const styles = StyleSheet.create({
    modalScrim: {
        flex: 1,
        backgroundColor: '#000000',
    },
    flex1: {
         flex: 1,
        paddingTop: RfH(28),
        backgroundColor: '#000000',

    },
    modalInner: {
        margin: 20,
        backgroundColor: '#fff',
    },
});

export default AddStoryContainer