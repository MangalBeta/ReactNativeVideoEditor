import React, { useState } from 'react';
import { Image, Pressable, View, FlatList } from 'react-native';
import { CustomText } from '../../../components';
import imagePath from '../../../constants/imagePath';
import Modal from 'react-native-modal';
import { BlurView } from "@react-native-community/blur";
import { RfH, RfW } from '../../../utils';
import commonStyles from '../../../themes/commonStyles';
import styles from './styles';

const ReactionsModal = ({ isVisible, onCloseActionSheet }) => {
    const [emojiList, setEmojiList] = useState([{
        image: imagePath?.ANGRY,
        id: 1,
        name: 'ANGRY'
    },
    {
        image: imagePath?.DISLIKE,
        id: 2,
        name: 'DISLIKE'
    },
    {
        image: imagePath?.LOVE,
        id: 3,
        name: 'LOVE'
    },
    {
        image: imagePath?.HAHA,
        id: 4,
        name: 'HAHA'
    },
    {
        image: imagePath?.SAD,
        id: 5,
        name: 'SAD'
    }, {
        image: imagePath?.LIKE,
        id: 6,
        name: 'LIKE'
    }
    ])
    const renderEmojiList = () => {
        return <View style={styles.rowEmoji}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={emojiList}
                keyExtractor={(item, index) => index + 'emoji'}
                renderItem={({ item, index }) => {
                    return <Pressable
                        onPress={() => alert(item?.id)}
                        style={styles.padd4}
                    ><Image source={item?.image}
                        style={styles.emojiStyle}
                        />
                    </Pressable>
                }}
            />
        </View>

    }


    return <Modal
        isVisible={isVisible}
        onSwipeComplete={() => onCloseActionSheet(false)}
        onBackdropPress={() => onCloseActionSheet(false)}
        transparent={true}
        backdropColor={'transparent'}
        backdropOpacity={0.0}
        style={styles.actionModalMain}
    >
        <BlurView
            style={styles.blurView}
            blurType='light'
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.11)"
        />


        <View style={{ flex: 1 }} />
        {renderEmojiList()}
        <View style={styles.reactionLeftView}>
            <CustomText
                styling={{ lineHeight: 24 }}
                fontWeight={'500'}
                color={'#000'}
            > {'I Like u '}</CustomText>
            <View style={styles.reactionLeftArrow}>
            </View>
            <View style={styles.reactionLeftArrowOverlap}></View>

        </View>
        <View style={styles.reactionActionToModalView}>

            <View
                style={styles.subContainerTopModal}
            >

                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Reply</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Copy</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Share</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Forward</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Private Reply</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Translate</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Info</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Delete</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Report to admin</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => onCloseActionSheet(false)}
                    style={styles.rowFront}>
                    <Image source={imagePath?.block} />
                    <View style={styles.padd16}>
                        <CustomText
                            color='#333333'
                            fontWeight='600' styling={{
                                lineHeight: 40
                            }}>Flag</CustomText>
                    </View>
                </Pressable>

            </View>
        </View>

    </Modal>
}

export default ReactionsModal