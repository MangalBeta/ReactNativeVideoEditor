import {
    View,
    SafeAreaView,
    Image,
    Pressable,
    ScrollView,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { AuthHeader, ButtonComponent, CustomText, Loader } from '../../components';
import styles from './styles';
import { RfH, RfW, showError, deviceHeight, showSuccess, Height } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

const CommanWebView = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const paramsData = route?.params?.data
    const [webUrl, setWebUrl] = useState(paramsData?.webUrl)
    const [headerTitle, setHeaderTitle] = useState(paramsData?.headerTitle)

    return (
        <View style={{
            flex: 1
        }}>
            <AuthHeader
                customMainHeadContainer={{
                    height:RfH(145)
                }}
                title={headerTitle}
            />
            <ScrollView
                scrollEnabled
                contentContainerStyle={{ 
                    flex:1,
                    paddingHorizontal: RfW(24) }}
                showsVerticalScrollIndicator={false}
                style={styles.container}
                bounces={false}>
                    {webUrl ? <WebView
                        mixedContentMode="compatibility"
                        canGoBack
                        scalesPageToFit
                        source={{
                            uri: webUrl,
                        }}
                        style={{ flex:1 }}
                        useWebKit={true}
                        incognito
                        allowsBackForwardNavigationGestures
                        sharedCookiesEnabled={true}
                        // userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
                        javaScriptEnabled={true}

                        domStorageEnabled={true}
                    /> : null}
            </ScrollView>
        </View>
    );
};

export default CommanWebView;
