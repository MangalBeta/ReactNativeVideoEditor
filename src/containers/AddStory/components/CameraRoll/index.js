const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    StyleSheet,
    Switch,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Dimensions,
} = ReactNative;
import CameraRoll, { PhotoIdentifier, GroupTypes } from "@react-native-community/cameraroll";
import { CustomText } from "../../../../components";
import imagePath from "../../../../constants/imagePath";
import { Height, RfH, RfW, Width } from "../../../../utils";


const CameraRollView = require('../CameraRollView');

const AssetScaledImageExampleView = require('../AssetScaledImage');
export default class CameraRollMain extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        groupTypes: 'All',
        sliderValue: 1,
        bigImages: true,
    };
    _cameraRollView: ?React.ElementRef;

    render() {
        return (
            <View style={styles.flex1}>
                <View style={styles.header}>
                    <ReactNative.Pressable
                    
                        onPress={() => this.props.navigation.goBack()}
                        style={styles.flex2}>
                        <Image source={imagePath?.ic_cross_white} />
                    </ReactNative.Pressable>
                    <View style={styles.flexMiddle}>
                        <CustomText color="#FFFFFF" fontSize={20} fontWeight={'600'}>
                            Add to Story
                        </CustomText>
                    </View>
                    {/* <View style={styles.flex3}>
                        <Image source={imagePath?.ic_settings_white} />
                    </View> */}
                </View>
                {/* <View style={styles.subHeader}>
                    <View style={styles.flex2}>
                        <CustomText color="#FFFFFF" fontSize={16} fontWeight={'600'}>
                            Gallery
                        </CustomText>
                    </View>
                    <View style={styles.flexMiddle}>

                    </View>
                    <View style={[styles.flex3, {
                        backgroundColor: '#222222',
                        borderRadius: RfH(2),
                        paddingHorizontal: RfW(2), justifyContent: 'center',
                        alignItems: 'center', height: RfH(32)
                    }]}>
                        <CustomText color="#FFFFFF" fontSize={16} fontWeight={'600'}>
                            Select
                        </CustomText>
                    </View>
                </View> */}

                {/* <CameraRollView
                    ref={ref => {
                        this._cameraRollView = ref;
                    }}
                    batchSize={20}
                    groupTypes={this.state.groupTypes}
                    renderImage={this._renderImage}
                    bigImages={this.state.bigImages}
                /> */}
            </View>
        );
    }

    loadAsset(asset) {
        if (this.props.navigator) {
            this.props.navigator.push({
                title: 'Camera Roll Image',
                component: AssetScaledImageExampleView,
                backButtonTitle: 'Back',
                passProps: { asset: asset },
            });
        }
    }

    _renderImage = (asset) => {
        const imageSize = Width() / 3 - RfW(2);
        const imageStyle = [styles.image, { width: imageSize, height: Height() / 5 }];
        const cameraStyle = [styles.image, {
            backgroundColor: '#222222',
            width: imageSize, height: Height() / 5
        }];

        console.log(asset?.node,"{asset?.node")
        return (
            <TouchableOpacity
                key={asset?.node?.image?.uri || 'camerakey'}
                onPress={this.loadAsset.bind(this, asset)}
            >
                <View style={styles.row}>
                    {asset?.node?.type == 'camera' ? <ReactNative.Pressable
                        onPress={() => this.props.setCameraState(asset?.node)}
                        style={cameraStyle}>
                            <View style={{
                                flex:1,
                                justifyContent:'center',alignItems:'center'}}>
                                <Image source={imagePath?.ic_cam_white} />
                            </View>
                        <View style={{
                            backgroundColor: '#222222',
                            justifyContent: 'flex-end',
                            paddingVertical: RfH(8), paddingHorizontal: RfW(12)
                        }}>

                            <CustomText 
                            fontWeight="bold"
                            color="#ffffff">
                                Camera
                            </CustomText>
                        </View>

                    </ReactNative.Pressable>:<Pressable
                        onPress={() => this.props.setCameraState(asset?.node)}
                    >
                        
                        <Image source={{ uri: asset.node.image.uri }} style={imageStyle} />
                    </Pressable>}

                </View>
            </TouchableOpacity>
        );
    };

    _onSliderChange = value => {
        const options = Object.keys(CameraRoll.GroupTypesOptions);
        const index = Math.floor(value * options.length * 0.99);

        const groupTypes = options[index];

        if (groupTypes !== this.state.groupTypes) {
            this.setState({ groupTypes: groupTypes });
        }
    };

    _onSwitchChange = value => {
        this.setState({ bigImages: value });
    };
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row', justifyContent: 'space-between',
        width: Dimensions.get('window').width,
    },
    subHeader: {
        paddingHorizontal: 16,
        paddingVertical: RfH(16),
        alignItems: 'center',
        flexDirection: 'row', justifyContent: 'space-between',
        width: Dimensions.get('window').width,
    },
    flex2: { flex: 0.2 },
    flexMiddle: { flex: 0.8, paddingHorizontal: RfW(16), justifyContent: 'center' },
    flex3: { flex: 0.3, alignItems: 'flex-end' },
    row: {
        //  flexDirection: 'row',
        flex: 1,
    },
    url: {
        fontSize: 9,
        marginBottom: 14,
    },
    image: {
        marginHorizontal: 1,
        marginVertical: RfH(1)
    },
    flex1: {
        flex: 1,
    },
});