import React, { useEffect, useMemo, useRef, useState } from 'react';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import {
    Image,
    Pressable,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';

import styles, { propertyHeaderImageHeight } from './styles';
import ownStyles from '../../HomeScreen/styles';
import friendStyle from '../../HomeScreen/components/FriendList/styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import { CustomText, InlineHomeTabs, ListEmptyComponent, TextInputWithLabel } from '../../../components';
import { Height, RfH, RfW, Width } from '../../../utils';
import { BlurView } from '@react-native-community/blur';
import imagePath from '../../../constants/imagePath';
import { color } from 'react-native-reanimated';
import colors from '../../../constants/colors';
import CustomeImageView from '../../HomeScreen/components/CustomeImageView';
import { OtherMembersGroupTab, RandomGalleryList } from '../../../constants/constants';
import { getUserGroup, getUserStoriesApi } from '../../../utils/url';
import { api } from '../../../utils/api';
const GroupDetails = ({ navigation ,route}) => {
    console.log(route,"routerouteroute")
    const [activeTab, setActiveTab] = useState('About');
    const [activeFriendTabIndex, setActiveFriendTabIndex] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [groupDetail,setGroupDetail] = useState(route?.params.groupData)
    const [activeButton, setActiveButton] = useState({
        name: 'Media', id: 1,
    })
    const [buttonsArray, setButtonArray] = useState([{
        name: 'Media', id: 1,
    }, {
        name: 'Links', id: 2,

    }, {
        name: 'Documents', id: 3,

    }
    ])
    const tabs = ['About', 'Members', 'Gallery']
    const toggleActiveTab = data => {
        setActiveTab(data);
    };
    useEffect(()=>{
        if(route?.params.groupData?._id){
            getGroupDetailCall(route?.params.groupData?._id)
        }
    },[route?.params.groupData?._id])

/************************************ APi Call *****************************/
    const getGroupDetailCall = async (id) => {
        try {
          const resposne = await api({
            method: 'GET',
            url: `${getUserGroup}/${id}`,
          });
          if (resposne?.success) {
           const { data } = resposne?.data
           if(data){
                setGroupDetail(data)
           }else{
             console.log('End Details fetch')
           }
          }
        } catch (error) {
            console.log(error)
        }
    } 
    const renderGroupTitleSection = () => {
        return (
            <View style={styles.propertyTitleSectionStyle}>
                <BlurView
                    style={styles.blurView}
                    blurType="light"
                    blurAmount={40}
                    overlayColor={'rgba(255,255,255,0.8)'}
                    />
                <View style={styles.propertyTitleViewStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomText
                            color='#282626'
                            fontSize={20}
                            fontWeight={'700'}
                            styling={{
                                textTransform:'capitalize',
                                lineHeight: 24
                            }}
                        >
                            {groupDetail?.groupName}
                        </CustomText>

                        <CustomText
                            color='#0066FE'
                            fontSize={16}
                            fontWeight={'700'}
                            styling={{
                                lineHeight: 24
                            }}
                        >
                            {'Edit'}
                        </CustomText>
                    </View>
                    <View style={{
                        paddingVertical: 4
                    }}>
                        <CustomText
                            color='#282626'
                            fontSize={12}
                            fontWeight={'400'}
                            styling={{
                                opacity: 0.7,
                                lineHeight: 16
                            }}
                        >
                            {`Private Group · ${groupDetail?.membersCount} Members`}
                        </CustomText>
                    </View>
                </View>
               {groupDetail?.creatorId && <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 16
                }}>
                    <View style={{ paddingRight: RfW(8) }}>
                       { groupDetail?.creatorId?.profilePicURL && <FastImage
                            style={styles.chatAvtarImage}
                            source={{ uri: groupDetail?.creatorId?.profilePicURL?.thumbnail }}
                            resizeMode={'cover'}
                        />}
                    </View>
                    <CustomText
                        fontSize={12}
                        fontWeight='400'
                        color='#333333'
                    >
                        Created By
                    </CustomText>
                    <CustomText
                        fontSize={12}
                        fontWeight='bold'
                        styling={{
                            textTransform:'capitalize'
                        }}
                        color='#0066FE'>
                        {`  ${groupDetail?.creatorId?.fullName}`}
                    </CustomText>
                </View>}
            </View>
        );
    }

    const renderGroupDetailView = () => {
        return <View style={styles.propertyTopViewWrapper}>
            {renderGroupTitleSection()}
        </View>
    }
    const renderPropertyImageView = () => {
        return (
            <View style={styles.headerImageContainer}>
               {groupDetail?.groupImage?.mediaType == "IMAGE" && <FastImage
                    resizeMode="cover"
                    source={{ uri: groupDetail?.groupImage?.original}}
                    style={styles.propertyImageStyle}
                >
                    <LinearGradient
                        style={{
                            flex: 1
                        }}
                        locations={[0, 1]}
                        colors={['rgba(0, 0, 0, 0.332414)', 'rgba(0, 0, 0, 0.332414)']}
                    >
                    </LinearGradient>
                </FastImage>}

            </View>
        );
    };

    const renderTabsData = () => {
        return <View
            style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                borderBottomWidth: 1,
              
                borderBottomColor: 'rgba(151, 151, 151, 0.2)'
            }}>
            {tabs.map(item => (
                <Pressable
                    style={{
                        paddingHorizontal: RfW(13),
                        paddingBottom: RfH(12),
                        borderBottomColor: activeTab === item ? '#4C70FF' : 'rgba(151, 151, 151, 0.2)',
                        borderBottomWidth: activeTab === item ? 2 : 0,
                        flex: 0.2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => toggleActiveTab(item)}>
                    <CustomText
                        fontSize={13}
                        fontWeight="600"
                        color={activeTab === item ? '#000000' : 'rgba(0,0,0,0.6)'}>
                        {item}
                    </CustomText>
                </Pressable>
            ))}
        </View>
    }

    const renderTableChildLabel = (title, subTitle) => {
        return <View style={{ paddingVertical: RfH(8) }}>
            <CustomText
                color='#000000'
                fontSize={13}
                styling={{
                    lineHeight: 24
                }}
                fontWeight='bold'>
                {title}
            </CustomText>
            {subTitle && <CustomText
                color='rgba(0,0,0,0.8)'
                fontSize={14}
                fontWeight='400'
                styling={{
                    lineHeight: 18
                }}
            >
                {subTitle}
            </CustomText>}
        </View>
    }

    const renderHashTagBtn = () => {
        return <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {groupDetail?.hashTags.map((item, index) => {
                return <View style={{
                    backgroundColor: index == 0 ? '#B0D0FF' : '#E6E6E6',
                    borderRadius: RfH(6),
                    marginHorizontal: index > 0 ? 8 : 0,
                    marginBottom: RfH(8),
                    paddingHorizontal: RfW(8),
                    justifyContent: 'center', alignItems: 'center',
                    paddingVertical: RfW(8)
                }}>
                    <CustomText
                        color={index == 0 ? '#0066FE' : '#9A9A9A'}
                        fontSize={12}
                        fontWeight={'400'}
                    >
                        #{item}
                    </CustomText>
                </View>
            })
            }
        </View>
    }


    const renderAboutTabView = () => {
        return <View style={{
            paddingHorizontal: RfW(16),
            paddingVertical: RfH(16),
        }}>
            {groupDetail?.subject ? renderTableChildLabel('Subject', groupDetail?.subject):null}
            {groupDetail?.category ? renderTableChildLabel('Category', groupDetail?.category) : null}
            {groupDetail && groupDetail?.hashTags.length ? renderTableChildLabel('HashTag', false) : null}
            {groupDetail && groupDetail?.hashTags?.length ? renderHashTagBtn() : null}
            {groupDetail?.terms && renderTableChildLabel('Terms & Conditions',groupDetail?.terms)}

        </View>

    }
    const renderMembersTabView = () => {
        return <View style={{
            paddingHorizontal: RfW(16),
            paddingVertical: RfH(16),
        }}>
            {groupDetail?.membersCount && renderTableChildLabel(`Total Members · ${groupDetail?.membersCount}`, ` ${groupDetail?.subject}`)}
            {renderSearchInput()}

        </View>

    }
    const renderSearchInput = () => {
        return <View style={{
            paddingTop: RfH(16)
        }}>
            <TextInputWithLabel
                autoCapitalize="none"
                borderFocusColor={'rgba(0, 0, 0, 0.16)'}
                inputText={searchText}
                labelFocusedStyle={styles.inputFocusedFontSize}
                placeholder={"Search for anything on Fivvia"}
                labelTextColor={'rgba(0,0,0,0.5)'}
                labelUnFoucsedStyle={styles.inputUnfocusedFontSize}
                maxLength={60}
                onChangeText={text => {
                    setSearchText(text)
                }}
                returnKeyType="default"
                selectionColor={'transparent'}
                textInputContainerStyle={styles.inputTextContainer}
                textInputStyle={styles.inputTextColor}
                rightIconPath={searchText ? false : imagePath?.ic_search_white}
                customeRightIconStyle={{
                    paddingRight: 12
                }}
                showClearBtn
                renderClearBtn
                clearBtnTxtColor={colors.white}
                clearBtnBgColor={colors.themeColor}
            />
        </View>
    }
    const renderButtonView = () => {
        return <View style={{
            paddingHorizontal: RfW(16),

        }}>
            {[1, 1, 1, 1, 1].map((item, index) => <TouchableOpacity
                key={'btn' + index}
                style={{
                    backgroundColor: '#E6E6E6',
                    borderRadius: RfH(4),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: RfW(16),
                    paddingVertical: RfH(8),
                    marginBottom: RfH(8)
                }}
            >
                <View style={{ alignSelf: 'flex-start' }}>
                    <Image

                        source={imagePath?.ic_calls_gray} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: RfW(8) }}>
                    <CustomText
                        color='#282626'
                    >
                        Custom Tune
                    </CustomText>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <CustomText
                        fontWeight='600'

                        color='#4C70FF'>
                        Select
                    </CustomText>
                </View>
            </TouchableOpacity>
            )}
        </View>
    }
    const renderAdmin = () => {
        return <View style={{
            paddingHorizontal: RfW(16)
        }}>
            {renderTableChildLabel('Admin', false)}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 1]}
                ListEmptyComponent={() => {
                    return <ListEmptyComponent />
                }}
                keyExtractor={(item, index) => index + 'userAdmin'}
                renderItem={({ item, index }) => renderUserItem(item, index)}
            />

        </View>
    }

    const renderOtherMembers = () => {
        return <View style={{
            paddingHorizontal: RfW(16)
        }}>
            {renderTableChildLabel('Other Members', false)}
            {renderGorupFilter()}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[1, 1]}
                ListEmptyComponent={() => {
                    return <ListEmptyComponent />
                }}
                keyExtractor={(item, index) => index + 'userAdmin'}
                renderItem={({ item, index }) => renderUserItem(item, index, false)}
            />

        </View>
    }
    const renderGorupFilter = () => {
        return <View
            style={styles.friendListCon}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={OtherMembersGroupTab}
                keyExtractor={(item, index) => 'contact' + index}
                renderItem={({ item, index }) => {
                    return <View><Pressable
                        onPress={() => setActiveFriendTabIndex(index)}
                        style={[{
                            paddingHorizontal: RfW(16),
                            justifyContent: 'center', alignItems: 'center'
                        }, activeFriendTabIndex == index && styles.activeFriendTabStyle]}
                    >
                        <CustomText
                            fontWeight='bold'
                            fontSize={14}
                            color={activeFriendTabIndex !== index ? 'rgba(40, 38, 38, 0.5)'
                                : '#4C70FF'}
                            styling={{ lineHeight: 24 }}
                        >
                            {item?.name} {item.id == 1 && `(22)`}
                        </CustomText>
                    </Pressable>
                    </View>
                }}
            />
        </View>
    }
    const renderUserItem = (item, index, isOtherGroup = true) => {
        return <View style={[ownStyles.listMainView, {
            paddingTop: RfH(8),
            marginVertical: 0,
            marginBottom: RfH(8)
        }]}>
            <View style={ownStyles.listImageSec}>
                <View style={[ownStyles.chatAvtarView]}>
                    {item?.profilePicURL ? <FastImage
                        style={[ownStyles.chatAvtarImage]}
                        source={{ uri: '' }}
                        resizeMode={'cover'}
                    /> : <CustomeImageView user={{
                        firstName: 'Mangal',
                        lastName: 'Singh'
                    }} />}
                </View>
            </View>
            <View style={[ownStyles.listMiddleView, {
                borderBottomWidth: index == 0 ? 1 : 0
            }]}>
                <View style={[ownStyles.listMiddleSec1, {
                    flex: 1
                }]}>
                    <CustomText color={'#292929'}
                        styling={{
                            lineHeight: 18
                        }}
                        fontSize={15} fontWeight={'bold'}
                    >
                        {'Mangal Singh'}
                    </CustomText>
                    <CustomText color={'rgba(0,0,0,0.7)'}
                        styling={{
                            lineHeight: 16
                        }}
                        fontSize={12}>
                        {`@ashish`}
                    </CustomText>

                </View>
                {isOtherGroup && <Pressable
                    onPress={() => alert('true')}
                    style={[styles.removeStyle]}>
                    <CustomText
                        color={'#F05353'}
                        fontSize={12} fontWeight={'700'} >
                        {'Remove'}
                    </CustomText>
                </Pressable>}
                {!isOtherGroup && <View>
                    <Pressable
                        onPress={() => alert('true')}
                        style={[{
                            justifyContent: 'center', alignItems: 'center',
                            paddingTop: RfH(8)
                        }]}>
                        <Image source={imagePath?.ic_more_chat} />
                    </Pressable>
                </View>}
            </View>
        </View>
    }
    const renderGroupHistoryItem = (item, index) => {
        return <View style={[ownStyles.listMainView, {
            paddingTop: RfH(8),
            marginVertical: 0,
            marginBottom: RfH(8)
        }]}>
            <View style={ownStyles.listImageSec}>
                <View style={[ownStyles.chatAvtarView]}>
                    {item?.userId?.profilePicURL ? <FastImage
                        style={[ownStyles.chatAvtarImage]}
                        source={{ uri: item?.userId?.profilePicUR?.thumbnail }}
                        resizeMode={'cover'}
                    /> : <CustomeImageView user={{
                        firstName: item?.userId?.firstName,
                        lastName: item?.userId?.lastName
                    }} />}
                </View>
            </View>
            <View style={[ownStyles.listMiddleView, {
                borderBottomWidth: index == 0 ? 1 : 0,
                flex: 1
            }]}>
                <View style={[ownStyles.listMiddleSec1, {
                    flex: 1,
                }]}>
                    <CustomText color={'#292929'}
                        styling={{
                            lineHeight: 18
                        }}
                        fontSize={14} fontWeight={'700'}
                    >
                        {item?.userId?.fullName}
                        <CustomText color={'rgba(0,0,0,0.7)'}
                            styling={{
                                lineHeight: 16
                            }}
                            fontSize={14}>
                            {`  ${item?.note} `}
                        </CustomText>
                    </CustomText>
                    <CustomText color={'#292929'}
                        styling={{
                            lineHeight: 18,
                            textTransform:'capitalize',
                        }}
                        fontSize={14} fontWeight={'700'}
                    >
                        {groupDetail?.groupName}
                    </CustomText>

                </View>

            </View>
        </View>
    }
    const renderGroupHistory = () => {
        return <View style={{
            paddingHorizontal: RfW(16)
        }}>
            {renderTableChildLabel('History', false)}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={groupDetail?.history}
                ListEmptyComponent={() => {
                    return <ListEmptyComponent />
                }}
                keyExtractor={(item, index) => index + 'history'}
                renderItem={({ item, index }) => renderGroupHistoryItem(item, index)}
            />

        </View>
    }

    const renderAboutGroup = () => {
        return <>
            {renderAboutTabView()}
            {renderButtonView()}
            {renderAdmin()}
            {groupDetail?.history && groupDetail?.history.length && renderGroupHistory()}
        </>
    }


    const renderMemberGroup = () => {
        return <>
            {renderMembersTabView()}
            {renderAdmin()}
            {renderOtherMembers()}

        </>
    }
    const changeTab = (item) => {
        setActiveButton(item)
    }

    const renderMedia = () => {
        return <View style={{
            marginTop: RfH(16),
            paddingHorizontal: RfW(9),
            flex: 1
        }}>
            <MasonryList
                keyExtractor={(item, index) => index + 'data'}
                ListHeaderComponent={<View />}
                style={{
                    paddingHorizontal: RfW(3),
                    alignSelf: 'stretch',

                }}

                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={RandomGalleryList}
                renderItem={({ item, index }) => {
                    const randomBool = useMemo(() => Math.random() < 0.5, []);

                    return <View style={{
                        marginHorizontal: 2,
                        marginVertical: 2,
                        flex: 1
                    }}>
                        <FastImage
                            resizeMode="cover"
                            source={{ uri: item?.imgURL }}
                            style={{
                                height: randomBool ? RfH(168) : RfH(120),
                                alignSelf: 'stretch',
                                borderRadius: RfH(4)

                            }}
                        >
                            <LinearGradient
                                style={{
                                    flex: 1
                                }}
                                locations={[0, 1]}
                                colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)']}
                            >
                            </LinearGradient>
                        </FastImage></View>

                }}
            />
        </View>

    }
    const rendeGroupGallery = () => {
        return <>
            <InlineHomeTabs
                customeStyle={{
                    marginTop: RfH(24),
                }}

                activeButton={activeButton}
                buttonsArray={buttonsArray}
                setActiveButton={(item) => changeTab(item)}
            />
            <View style={{
                paddingTop: RfH(24),
                paddingHorizontal: RfW(16),
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <CustomText fontSize={16} fontWeight={'700'}>
                    43 Files
                </CustomText>
                <CustomText fontSize={16}
                    color={'#4C70FF'}
                    fontWeight={'600'}>
                    + Add Media
                </CustomText>


            </View>
            {renderMedia()}


        </>

    }

    return <View style={styles.container}>
        <ParallaxScroll
            headerHeight={88}
            isHeaderFixed={false}
            headerFixedBackgroundColor={'rgba(0,0,0,0.3)'}
            renderHeader={()=>{
                return <Pressable
                onPress={()=> navigation.goBack()}
                 style={{
                paddingTop:RfH(42),
                paddingHorizontal:RfW(8),
               }}>
                   <Image
                   style={{
                    tintColor:'white'
                   }}
                   source={imagePath?.ic_back_black} />
               </Pressable>
            }}
            parallaxBackgroundScrollSpeed={3}
            parallaxForegroundScrollSpeed={2.5}
            parallaxHeight={propertyHeaderImageHeight}
            showVerticalScroll={false}
            renderParallaxBackground={({ animatedValue }) =>
                renderPropertyImageView(animatedValue)
            }
            style={styles.containerStyle}>
            <View style={{ flex: 1, backgroundColor: colors.white }}>
               
                {renderGroupDetailView()}
                <View style={{top:-25}}>
                {renderTabsData()}
                {activeTab == 'About' && renderAboutGroup()}
                {activeTab == 'Members' && renderMemberGroup()}
                {activeTab == 'Gallery' && rendeGroupGallery()}
                <View style={{ height: RfH(50) }} />
                </View>
            </View>
        </ParallaxScroll>
    </View>
};
export default GroupDetails
