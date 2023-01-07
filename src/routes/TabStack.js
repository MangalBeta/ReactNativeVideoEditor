import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CurvedBottomTab, CustomBottomTabBar } from '../components';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../constants/navigationStrings';
import { RfH, RfW } from '../utils/helpers';
import colors from '../constants/colors';
import { HomeScreen, Profile } from '../containers';
import commonStyles from '../themes/commonStyles';

const Tab = createBottomTabNavigator();

let showBottomBar_ = true;

const MyComponent = () =>{
    return <View></View>
}
export default function TabRoutes(props) {
    const getTabBarVisibility = (route, navigation, screen) => {
        if (navigation && navigation.isFocused && navigation.isFocused()) {
            const route_name = getFocusedRouteNameFromRoute(route);
            if (screen.includes(route_name)) {
                showBottomBar_ = false;
                return false;
            }
            showBottomBar_ = true;
            return true;
        }
    };
    return (
        <Tab.Navigator
            backBehavior={'initialRoute'}
            tabBar={(props) => {
                if (showBottomBar_) {
                    return <CurvedBottomTab
                        {...props} />
                }
            }}
            style={{

            }}
            tabBarOptions={{
                labelStyle: {
                    textTransform: 'capitalize',
                    fontFamily: 'Glory',
                    fontSize: 12,
                    color: 'white'
                },


                // showLabel: false,
            }}
            initialRouteName={navigationStrings.LETS_TALK}

            >
            <Tab.Screen
                 component={ ()=><View></View>}
                name={navigationStrings.LOGIN}
                options={({ route, navigation }) => ({
                    headerShown: false,
                    tabBarVisible: getTabBarVisibility(route, navigation, [
                    ]),
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Image
                            style={[
                                { tintColor: tintColor },
                                { height: 28, width: 28 }
                            ]}
                            source={
                                focused
                                    ? imagePath.ic_home
                                    : imagePath.ic_home
                            }
                        />
                    ),
                })}
            />
            <Tab.Screen
                component={MyComponent}
                name={navigationStrings.HOME}
                label={'LET TALK'}
                options={({ route, navigation }) => ({
                    headerShown: false,
                    tabBarVisible: getTabBarVisibility(route, navigation, [
                    ]),
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Image
                            style={[
                                { tintColor: tintColor },
                                { height: 28, width: 28 }
                            ]}
                            source={
                                focused
                                    ? imagePath.ic_timeline
                                    : imagePath.ic_timeline
                            }
                        />
                    ),
                })}
            />
            <Tab.Screen
                component={HomeScreen}
                name={navigationStrings.LETS_TALK}
                label={'LET TALK'}
                options={({ route, navigation }) => ({
                    headerShown: false,
                    tabBarVisible: getTabBarVisibility(route, navigation, [
                    ]),
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Image
                        style={[
                            { tintColor: tintColor },
                            { height: 28, width: 28 }
                        ]}
                        source={
                            focused
                                ? imagePath.ic_timeline
                                : imagePath.ic_timeline
                        }
                    />
                    ),
                })}
            />
            <Tab.Screen
                component={MyComponent}
                name={navigationStrings.WELCOME_SCREEN}
                options={({ route, navigation }) => ({
                    headerShown: false,
                    tabBarVisible: getTabBarVisibility(route, navigation, [
                    ]),
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Image
                            style={[
                                { tintColor: tintColor },
                                { height: 28, width: 28 }
                            ]}
                            source={
                                focused
                                    ? imagePath.ic_cab
                                    : imagePath.ic_cab
                            }
                        />
                    ),
                })}
            />
            <Tab.Screen
                 component={MyComponent}
                name={navigationStrings.PROFILE}
                options={({ route, navigation }) => ({
                    headerShown: false,
                    tabBarVisible: getTabBarVisibility(route, navigation, [
                    ]),
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Image
                            style={[
                                { tintColor: tintColor },
                                { height: 28, width: 28 }
                            ]}
                            source={
                                focused
                                    ? imagePath.ic_more
                                    : imagePath.ic_more
                            }
                        />
                    ),
                })}
            />
        </Tab.Navigator>
    );
}

export function stylesData(params) {
    const styles = StyleSheet.create({
        cartItemCountView: {
            position: 'absolute',
            zIndex: 100,
            top: -5,
            right: -5,
            backgroundColor: colors.themeColor,
            width: RfW(18),
            height: RfH(18),
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
        cartItemCountNumber: {
            color: colors.white,
            fontSize: 8,
        },
    });
    return styles;
}
