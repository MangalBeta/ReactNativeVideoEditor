import React, { Fragment } from 'react';
import { Text,Alert, ImageBackground, View, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import imagePath from '../../constants/imagePath';
import commonStyles from '../../themes/commonStyles';
import { Height, RfH, RfW, Width } from '../../utils';
import CustomText from '../CustomText';
import InlineButtonWrapper from '../InlineButtonWrapper';
import styles from './styles';
import { getUserLoginDataSelector } from '../../redux/selectors/profile';
import { createStructuredSelector } from 'reselect';
import { createlogOutUser } from '../../redux/actions';


const stateSelector = createStructuredSelector({
  userData: getUserLoginDataSelector,
})
const CustomDrawerContent = ({
  state,
  descriptors,
  navigation,
  progress,
  ...props
}) => {
  const dispatch = useDispatch()
  const { userData } = useSelector(stateSelector)

  //Logout function
  const userlogout = () => {
    return Alert.alert('', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        // style: 'destructive',
      },
      {
        text: 'Confirm',
        onPress: () => {
          dispatch(createlogOutUser.trigger());
        },
      },
    ]);

  };
  const renderBackdrop = () => (
    <View

      style={styles.backdropContainer}>
      <BlurView
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 100
        }}
        blurType='dark'
        blurAmount={10}
        reducedTransparencyFallbackColor="red"
      />
    </View>
  );

  const renderProfileOption = () => {
    return [{
      name: 'Let’s Talk',
      icon: imagePath?.ic_chat_side_panel
    }, {
      name: 'Help',
      icon: imagePath?.ic_help_side_panel
    },
    {
      name: 'Setting',
      icon: imagePath?.ic_settings_side_panel
    },
    {
      name: 'Logout',
      icon: imagePath?.ic_logout_side_panel,
      action:()=>userlogout()
    },
    ].map((item, index) => <Pressable
      onPress={() =>item?.action ? item?.action () :alert('In Progress')}
      key={index + 'profileotion'}
      style={{
        flexDirection: 'row',
        paddingHorizontal: RfW(24),
      }}>
      <Image
        alignSelf={'center'}
        source={item?.icon} />
      <View style={{ paddingHorizontal: RfW(16) }}>
        <CustomText color='#00000'
          fontWeight='500' styling={{ lineHeight: 48 }}>
          {item?.name}
        </CustomText>
      </View>
    </Pressable>)
  }
  const renderMultiProfile = () => {
    if (userData?.profiles?.length) {
      return userData?.profiles.map((pro, inx) => {
        return <View
          key={'inx' + inx + 'profile'}
          style={{
            flexDirection: 'row',
            marginBottom: 8
          }}>
          <View style={{
            justifyContent: 'center',
            paddingRight: RfW(8)
          }}>
            <Image source={imagePath?.ic_radio_active} />
          </View>
          <View style={{
            justifyContent: 'center',
            paddingHorizontal: RfW(8)
          }}>

            {pro?.profilePicURL?.thumbnail ? <Image
              style={{
                height: RfW(40), width: RfW(40),
                borderRadius: RfW(40) / 2
              }}
              source={{ uri: pro?.profilePicURL?.thumbnail }} />
              : <View style={{
                height: RfW(40), width: RfW(40),
                borderRadius: RfW(40) / 2,
                backgroundColor: colors.themeColor,
                justifyContent: 'center', alignItems: 'center'
              }}>
                <CustomText
                  color='white'
                  fontSize={18}
                >
                  {pro?.firstName.substring(0, 1).toUpperCase()}  {pro?.lastName.substring(0, 1).toUpperCase()}
                </CustomText>

              </View>
            }
          </View>
          <View style={{ paddingHorizontal: RfW(16) }}>
            <CustomText fontWeight='600'>
              {pro?.firstName} {pro?.lastName}
            </CustomText>
            <CustomText>
              {pro?.userName}
            </CustomText>
          </View>

        </View>
      })
    }
  }


  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => navigation.closeDrawer()}
      >
        <View style={{
          marginHorizontal: RfW(0)
        }}>
          {renderBackdrop()}
          <Animated.View
            //   style={{transform: [{translateX}]}}
            style={{
              height: Height(),
              marginTop: Height() / 7,
              width: '100%',
              // borderTopLeftRadius: RfH(24),
              // borderTopRightRadius: RfH(24),
              ...commonStyles.shadowDrawer,
              elevation:0
              // marginHorizontal: RfW(8)

            }}
            colors={[colors.themeColor, colors.themeColor]}>

            <ImageBackground
              imageStyle={{
                // borderTopLeftRadius: RfH(24),
                // borderTopRightRadius: RfH(24),
                paddingHorizontal: 16,
                ...commonStyles.shadowDrawer,
              }}
              resizeMode={'stretch'}
              style={{
                height: '100%',
               

              }}
              source={imagePath?.background_side_panel}
            >
              <View style={styles.topProfileNotch}>
                {userData?.profilePicURL?.thumbnail ? <ImageBackground source={{ uri: userData?.profilePicURL?.thumbnail }}
                  imageStyle={{
                    borderRadius: RfW(62) / 2
                  }}
                  style={{
                    height: RfW(62),
                    width: RfW(62),

                  }}
                  resizeMode={'cover'}
                >
                  <View style={{
                    right: -RfW(8),
                    top: -RfH(4),
                    position: 'absolute'
                  }}>
                    {userData?.chatStatus == 'ONLINE' && <Image source={imagePath.ic_online} />}
                  </View>

                </ImageBackground> : <View style={{
                  height: RfW(62),
                  width: RfW(62),
                  backgroundColor: colors.themeColor,
                  borderRadius: RfW(62) / 2,
                  justifyContent: 'center', alignItems: 'center'
                }}>

                  <CustomText
                    color='white'
                    fontSize={32}

                  >
                    {userData?.firstName.substring(0, 1).toUpperCase()}{userData?.lastName.substring(0, 1).toUpperCase()}

                  </CustomText>
                  <View

                    style={{
                      right: -RfW(8),
                      top: -RfH(4),
                      position: 'absolute',
                    }}>
                    {userData?.chatStatus == 'ONLINE' && <Image source={imagePath.ic_online} />}
                  </View>
                </View>
                }
              </View>
              <ScrollView style={{
                flex: 1,
                paddingTop: RfH(80)
              }}>
                <View style={{
                  flex: 0.25,
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <CustomText color='#282626'
                    styling={{
                      lineHeight: RfH(24)
                    }}
                    fontWeight='bold' fontSize={20}>
                    {userData?.firstName} {userData?.lastName}
                  </CustomText>
                  <CustomText
                    color='rgba(40, 38, 38, 0.7)'
                    styling={{
                      lineHeight: RfH(24)
                    }}
                    fontSize={13}>
                    {userData?.userName}
                  </CustomText>
                  <View style={{
                    height: 1,
                    backgroundColor: 'rgba(151, 151, 151, 0.3)',
                    width: RfW(50),
                    alignSelf: 'center',
                    marginTop: RfH(8),
                    justifyContent: 'center', alignItems: 'center'
                  }} />
                </View>
                <View style={{
                  flex: 0.5,
                }}>



                  {userData?.chatStatus == 'ONLINE' && <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: RfW(24),
                    paddingTop: RfH(16)
                  }}>

                    <View style={{ flex: 0.2 }}>
                      <Image source={imagePath?.ic_online} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                      <CustomText
                        color='#000000'
                        styling={{
                          lineHeight: RfH(24)
                        }}
                        fontWeight={'500'}
                        fontSize={14}>
                        Online
                      </CustomText>
                    </View>
                    <View style={{
                      justifyContent: 'center'
                      , paddingRight: RfW(4)
                    }}>
                      <Image source={imagePath?.ic_dropdown} />
                    </View>
                  </View>}


                  <View
                    style={{
                      paddingTop: RfH(24),
                      paddingHorizontal: RfW(24),
                    }}
                  >
                    <CustomText
                      color='rgba(40, 38, 38, 0.6)'
                      styling={{
                        lineHeight: RfH(24)
                      }}
                      fontWeight={'bold'}
                      fontSize={12}>
                      PROFILE OPTIONS
                    </CustomText>
                  </View>

                  {renderProfileOption()}
                  <InlineButtonWrapper
                    buttonsArray={
                      ['Fivvia.com', 'Terms & Condition', 'Privacy Policy']
                    }
                    customeStyle={{
                      marginHorizontal: 0,
                      marginRight: RfW(0),
                      marginBottom: RfH(0),
                      marginTop: RfH(8),
                      backgroundColor:'transparent',
                      height:RfH(24),
                      borderRadius:0,
                    }}
                    customeActiveStyle={{
                      backgroundColor: 'transparent',
                      borderRadius: RfH(0),
                      shadowRadius:0,
                      flexDirection: 'row',
                      borderBottomWidth:0.5,
                      // paddingTop:24,
                      
                      borderBottomColor:colors.borderLight,
                   
                    }}
                    customeTextStyle={{
                      color: '#4C70FF'
                    }}
                    // activeButton={'Fivvia.com'}
                    setActiveButton={() => null}
                  />

                  <View style={{
                    paddingHorizontal: RfW(24),
                  }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: RfH(24)
                      }}
                    >
                      <CustomText
                        color='rgba(40, 38, 38, 0.6)'
                        styling={{
                          lineHeight: RfH(24)
                        }}
                        fontWeight={'bold'}
                        fontSize={12}>
                        SWITCH ACCOUNT
                      </CustomText>

                      <CustomText
                        color='#1975FE'
                        styling={{
                          lineHeight: RfH(24),
                          paddingRight: RfW(4),
                        }}
                        fontWeight={'bold'}
                        fontSize={12}>
                        + Create New
                      </CustomText>
                    </View>
                    {renderMultiProfile()}
                    <View style={{
                      paddingTop: RfH(8),
                      paddingBottom: RfH(24),
                      flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                      <Image source={imagePath?.ic_qr_profile} />
                      <Image source={imagePath?.ic_qr_profile_cam} />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
export default React.memo(CustomDrawerContent);
