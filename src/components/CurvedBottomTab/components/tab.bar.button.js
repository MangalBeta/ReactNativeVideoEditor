import React, { memo, useEffect, useState } from 'react';
import {
  Animated,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { style } from '../styles/tab.bar.button.styles';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../InlineButtonWrapper/styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);
import cssStyle from '../styles/tab.css'
import commonStyles from '../../../themes/commonStyles';
interface Props {
  mode: 'default' | 'square';
  index: number;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: BottomTabNavigationOptions;
  inactiveTintColor?: string;
  activeTintColor?: string;
  springConfig?: Animated.SpringAnimationConfig;
  focusedButtonStyle?: StyleProp<any>;
}

export const defaultSpringConfig = {
  damping: 30,
  mass: 0.7,
  stiffness: 250,
};

export const BarButton: React.FC<Props> = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    inactiveTintColor,
    focusedButtonStyle,
    springConfig,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold, springConfig]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            style.unfocusedButton,
            { opacity: animationValueThreshold },
            {
              transform: [
                {
                  scale: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
            isFocused ? focusedButtonStyle : {},
          ]}
          onLongPress={onLongPress}
        >
          <View style={style.tabBarLabelWrapper}>
            {options.tabBarIcon && !isFocused ? (
              options.tabBarIcon({
                focused: isFocused,
                color: inactiveTintColor || '#5C48E1',
                size: 28,
              })
            ) : (
              <View />
            )}
            {options.tabBarLabel && (
              <AnimatedText
                style={[
                  {
                    marginTop: 2,
                    color: inactiveTintColor,
                  },
                  {
                    opacity: animationValueThreshold.interpolate({
                      inputRange: [0.5, 1],
                      outputRange: [0, 1],
                    }),
                  },
                  options.tabBarLabelStyle,
                ]}
              >
                {options.tabBarLabel}
              </AnimatedText>
            )}
          </View>
        </AnimatedTouchable>
      </View>
    );
  },
);

export const TabBarButton: React.FC<Props> = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    activeTintColor,
    springConfig,
    focusedButtonStyle,
    mode,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold, springConfig]);

    return (
      <View style={style.wrapper}>

        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityComponentType="Button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            {
              ...style.focusedButton,
              ...cssStyle,
              ...(mode === 'square' ? style.squareFocusedButton : {}),
              backgroundColor: activeTintColor || 'white',
              transform: [
                {
                  translateY: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-45, 100],
                  }),
                },
              ],
            },
            isFocused ? focusedButtonStyle : {
              top: 40,
            },
          ]}
          onLongPress={onLongPress}
        >
          <View style={{
            height: 72,
            width: 72,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 72 / 2,
            borderWidth:1.5,
            borderColor:'white',
            backgroundColor: 'rgba(0, 102, 254, 0.11)',
            ...commonStyles.shadowDetailsTitleView
          }}>
            <LinearGradient
              colors={['#A297EE', '#5C48E1']}
              style={style.linearIconStyle}
            >
              {options.tabBarIcon
                ? options.tabBarIcon({
                  focused: isFocused,
                  size: 28,
                })
                : null}
            </LinearGradient>
          </View>

        </AnimatedTouchable>

      </View>
    );
  },
);

export default TabBarButton;
