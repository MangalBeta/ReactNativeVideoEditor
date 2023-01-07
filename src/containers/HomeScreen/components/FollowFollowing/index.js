{/************  FIVVIA STORY VIEW *************/ }

import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image, ActivityIndicator, Pressable } from 'react-native';
import imagePath from '../../../../constants/imagePath';
import commonStyles from '../../../../themes/commonStyles';
import { RfH, RfW } from '../../../../utils/helpers';
import { CustomText, ListEmptyComponent, TextInputWithLabel } from '../../../../components';
import FastImage from 'react-native-fast-image';
import styles from '../../styles';
import ownStyle from './styles';
import { showSuccess } from '../../../../utils';
import CustomeImageView from '../CustomeImageView';
import { api } from '../../../../utils/api';
import colors from '../../../../constants/colors';
import { postUserFollow } from '../../../../utils/url';
const FollowFollowingItems = ({
    urlName, activeTab
}) => {
    const limit = 10
    const [skip, setSkip] = useState(0)
    const [lists, setLists] = useState([])
    const [count, setCount] = useState(0)
    const [searchText,setSearchText] = useState(null)

    useEffect(() => {
        setLists([])
        setCount(0)
        getFollowFollowee(urlName, 0)
    }, [urlName])

   



    const getFollowFollowee = async (url, skip = 0,searchValue='') => {
        try {
            if(urlName == 'search' && searchValue){
                url = `user/${url}?search=${searchValue}&limit=${limit}&skip=${skip}`
            }else{
                url =  `user/${url}?limit=${limit}&skip=${skip}`
            }
            const resposne = await api({
                method: 'GET',
                url:url,
            });
            if (resposne?.success) {
                const { listing, count } = resposne?.data?.data
                if (listing && listing.length > 0) {
                    if (skip > 0) {
                        setLists([...lists, ...listing])
                        setCount(count)
                    } else {
                        setLists(listing)
                        setCount(count)
                    }
                } else {
                    if (count == 0) {
                        setLists([])
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateList =(id) =>{
        const updatedData = lists.map((x,i)=> {
            if(x._id == id){
                return {...x,isFollowing:true}
            }else{
                return {...x}
            }
        })
        return updatedData
    }

    const userFollow = async (item) =>{
        if(item?._id){
            try {
                const payload = {}
                payload['followee']= item?._id
                const resposne = await api({
                    method: 'POST',
                    url:postUserFollow,
                    data:payload
                });
                if (resposne?.success) {
                    showSuccess('User Follow successfully')
                    const { upserted,ok } = resposne?.data?.data
                    if (upserted && upserted.length > 0) {
                        setLists(updateList(item?._id))
                    } 
                }
            } catch (error) {
                console.log(error)
            }
        }
    }



    const fetchMoredata = () => {
        if (count > skip) {
            setSkip(skip + limit)
        }
    }

    const renderFooter = () => (
        <View style={styles.footerText}>
            {count > 0 && count >= skip && <ActivityIndicator />}
        </View>
    )

    const renderFollowItem = (item, index) => {
        return <View style={styles.listMainView}>
            <View style={styles.listImageSec}>
                <View style={[styles.chatAvtarView]}>
                    {item?.profilePicURL ? <FastImage
                        style={[styles.chatAvtarImage]}
                        source={{ uri: item?.profilePicURL?.thumbnail }}
                        resizeMode={'cover'}
                    /> : <CustomeImageView user={item} />}
                </View>
            </View>
            <View style={styles.listMiddleView}>
                <View style={ownStyle.listMiddleSec1}>
                    <CustomText color={'#292929'}
                        styling={{
                            lineHeight: 18
                        }}
                        fontSize={15} fontWeight={'bold'}
                    >
                        {item?.fullName}
                    </CustomText>
                    <CustomText color={'rgba(0,0,0,0.7)'}
                        styling={{
                            lineHeight: 16
                        }}
                        fontSize={12}>
                        {item?.userName}
                    </CustomText>

                </View>
                {(urlName == 'follower' || urlName == 'search') && <Pressable 
                disabled={item?.isFollowing}
                onPress={()=> userFollow(item)}
                style={[item?.isFollowing ? ownStyle.followingStyle :
                    ownStyle.followStyle
                ]}>
                    <CustomText
                        color={item?.isFollowing ? '#4C70FF' : '#FFFFFF'}
                        fontSize={11} fontWeight={'bold'} >
                        {item?.isFollowing ? 'Following' : 'Follow'}
                    </CustomText>
                </Pressable>}
            </View>
        </View>
    }

    return <View style={{ paddingTop: RfH(8) }}>
        { urlName == 'search' && <View style={{
            paddingBottom:RfH(16)
        }}>
         <TextInputWithLabel
              autoCapitalize="none"
              borderFocusColor={'rgba(0, 0, 0, 0.16)'}
              inputText={searchText}
              labelFocusedStyle={ownStyle.inputFocusedFontSize}
              placeholder={"Search by Name or User ID"}
              labelTextColor={'rgba(0,0,0,0.5)'}
              labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
              maxLength={60}
              onChangeText={text =>{
                  setSearchText(text)
                  getFollowFollowee(urlName,0,text)
              }}
              returnKeyType="default"
              selectionColor={'transparent'}
              textInputContainerStyle={ownStyle.inputTextContainer}
              textInputStyle={ownStyle.inputTextColor}
              rightIconPath={searchText?false:imagePath?.ic_search_white}
              customeRightIconStyle={{
                  paddingRight:12
              }}
              showClearBtn
              renderClearBtn
           
              clearBtnTxtColor={colors.white}
              clearBtnBgColor={colors.themeColor}
            />
        </View>}
         
        
         <FlatList
            showsVerticalScrollIndicator={false}
            data={lists}
            ListEmptyComponent={() => {
                return <ListEmptyComponent />
            }}
            keyExtractor={(item, index) => index + 'follow'}
            renderItem={({ item, index }) => renderFollowItem(item, index)}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.5}
            onEndReached={() => fetchMoredata()}


        />
    </View>

}
export default FollowFollowingItems