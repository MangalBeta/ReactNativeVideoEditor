import {StyleSheet, Dimensions} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../constants/colors';
import { STANDARD_SCREEN_SIZE } from '../../../constants/constants';
import commonStyles from '../../../themes/commonStyles';
import {RfH, RfW} from '../../../utils';

const {height: deviceHeight, width: deviceWidth} =
  Dimensions.get('window');
export const propertyHeaderImageHeight = deviceHeight * 0.45;

const masterPlanGridSize = deviceWidth / 2 - 40;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    minHeight: deviceHeight * 0.9,
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    
  },

  wrapper: {
    flex: 1,
    zIndex: 10,
    margin: 10,
    marginHorizontal: 12,
    padding: 16,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  propertyTitleSectionStyle: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    flex:1,
    paddingHorizontal:16,

  },
  propertyTitleViewStyle: {
    flex: 1,
    paddingTop:RfH(8),
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  propertyTitleStyle: {
    color: '#232323',
    
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 24,
    flexWrap: 'wrap',
    // fontWeight: '700',
  },
  propertyLocationView: {
    flexDirection: 'row',
    paddingTop:RfH(12),
    paddingVertical:RfH(8),
    backgroundColor:'rgba(255, 255, 255, 0.798132)'
  },
  propertyLocationText: {
    color: '#666666',
    
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 17,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  separatorHorizontal: {
    backgroundColor: '#EDEEF0',
    height: 1,
  },
  propertyStatusWrapper: {
    marginVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
  },
  propertyStatusViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#DCAC69',
  },
  propertyStatusStyle: {
    color: '#FFFFFF',
    fontSize: 11,
    
    textAlign: 'center',
  },
  customerAccountNumberViewStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  customerAccountNumberHeaderStyle: {
    
    fontSize: 12,
    lineHeight: 13,
    color: '#858F99',
    marginBottom: 6,
    textAlign: 'left',
  },
  customerAccountNumberStyle: {
    
    fontSize: 14,
    lineHeight: 16,
    color: '#232323',
    textAlign: 'left',
  },
  propertyInfoContainerStyle: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  propertyGrid: {
    marginVertical: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    
    fontSize: 14,
    lineHeight: 16,
    color: '#232323',
  },
  propertyInfoViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  propertyInfoRowViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 40,
    width: 143,
  },

  propertyInfoImageStyle: {
    width: 32,
    height: 32,
  },
  propertyParkingViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#EDF0F2',
  },
  propertyParkingTitleTextStyle: {
    
    fontSize: 14,
    textAlign: 'left',
    color: '#313943',
  },
  propertyParkingTextStyle: {
    
    fontSize: 14,
    textAlign: 'left',
    color: '#313943',
    lineHeight: 18,
  },
  propertyTimelineTextViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  propertyTimelineTextStyle: {
    
    fontSize: 12,
    color: '#858F99',
  },
  headerImageContainer: {
    height: propertyHeaderImageHeight,
    width: '100%',
    
  },
  propertyImageStyle: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius:RfH(12),
    borderBottomRightRadius:RfH(12),
  },
  propertyHandedOverSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  propertyHandedOverViewStyle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  propertyHandedOverTextStyle: {
    color: '#313943',
    
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  moveInGuideTextStyle: {
    color: '#313943',
    
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  propertyHandedOverDescTextStyle: {
    marginRight: 10,
    color: '#858F99',
    textAlign: 'left',
    
    fontSize: 14,
  },
  propertyHandedOverStatusViewStyle: {
    alignItems: 'flex-start',
    borderRadius: 6,
    marginTop: 16,
    marginBottom: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  propertyHandedOverImageViewStyle: {
    alignItems: 'flex-start',
  },
  propertyHandedOverDateViewStyle: {
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#EDF0F2',
    alignItems: 'flex-start',
  },
  propertyHandedOverDateTextStyle: {
    color: '#000000',
    
    fontSize: 12,
    marginTop: 12,
  },
  propertyConstructionContainerStyle: {
    // flex: 1,
  },
  propertyConstructionProgressBarStyle: {
    paddingTop: 20,
  },
  propertyBoughtSectionViewStyle: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  propertyBoughtDateSectionStyle: {
    marginRight: 12,
  },
  propertyBoughtTitleSectionStyle: {
    flex: 4,
    alignItems: 'flex-start',
  },
  propertyBoughtImageSectionStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  propertyBoughtImageStyle: {
    borderRadius: 6,
  },
  propertyBoughtTitleTextStyle: {
    color: '#313943',
    
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 24,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  propertyBoughtDescription: {
    marginRight: 10,
    color: '#858F99',
    
    fontSize: 14,
    textAlign: 'left',
  },
  propertyBoughtDescTextStyle: {
    color: '#858F99',
    
    fontSize: 13,
    textAlign: 'left',
    lineHeight: 16,
    flexWrap: 'wrap',
  },
  propertyBoughtTextStyle: {
    color: '#313943',
    
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  moveInGuideSectionStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  moveInTitleViewStyle: {
    flex: 2,
  },
  moveInSectionViewStyle: {
    flexDirection: 'row',
    flex: 1,
    zIndex: 10,
    borderRadius: 6,
  },
  moveInDateSectionStyle: {
    marginRight: 16,
  },
  moveInTitleTextStyle: {
    color: '#313943',
    
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    lineHeight: 20,
    marginRight: 8,
  },
  moveInDescTextStyle: {
    color: '#858F99',
    
    fontSize: 15,
    lineHeight: 16,
    textAlign: 'left',
  },
  handedOverSectionWrapper: {
    flex: 1,
    zIndex: 10,
    margin: 10,
    marginHorizontal: 12,
    // marginBottom: 0,
    padding: 16,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  propertyTopViewWrapper: {
    marginHorizontal: 12,
    top: -RfH(50),
    zIndex: 10000,
    minHeight:RfH(145),
    borderRadius: RfH(8),
    borderWidth:2,
    borderColor:colors.white,
    backgroundColor:'rgba(255, 255, 255, 0.87)',
    ...commonStyles.shadowDetailsTitleView
  },
  blurView: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: RfH(8),
    right: 0
},
  
  propertyParkingWrapper: {
    zIndex: 10,
    marginHorizontal: 12,
    marginBottom: 15,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  milstoneItemTitleSectionStyle: {
    flex: 1,
    marginHorizontal: 12,
  },
  propertyInfoRowStyle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 10,
  },
  propertyInfoPropertyImageStyle: {
    borderRadius: 4,
  },
  propertyInfoImageAndStatusViewStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 100,
  },
  progressBarViewStyle: {
    width: 100,
    marginTop: 4,
  },
  propertyInfoPropertyTypeViewStyle: {
    width: 100,
    height: 22,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
    backgroundColor: 'rgb(67, 67, 67)',
  },
  propertyInfoPropertyTypeStyle: {
    color: '#FFFFFF',
    width: 100,
    height: 22,
    padding: 4,
    fontSize: 12,
    lineHeight: 14,
    
    textAlign: 'center',
  },
  viewPropertyDetailsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  viewPropertyDetailsArrow: {
    marginLeft: 2,
    marginTop: 4,
    height: 14,
    width: 14,
    tintColor: '#1aa2e2',
    opacity: 0.7,
  },
  viewPropertyDetailsTextStyle: {
    // lineHeight: 15,
    fontSize: 14,
    color: '#1aa2e2',
    justifyContent: 'center',
  },
  propertyTileItemDisplayStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 4,
    paddingVertical: 22,
    paddingHorizontal: 4,
    borderRadius: 6,
    maxHeight: 110,
  },
  propertyTileRowStyle: {
    flexDirection: 'row',
  },
  propertyTileImageStyle: {
    width: 42,
    height: 42,
  },
  propertyTileTitleStyle: {
    color: 'rgb(49, 57, 67)',
    fontSize: 14,
    lineHeight: 15,
    minHeight: 34,
    textAlignVertical: 'center',
    marginTop: 12,
  },
  propertyTileViewStyle: {
    flexDirection: 'column',
    marginTop: 20,
  },
  chatAvtarImage:{
      height:RfH(56),width:RfH(56),
      borderRadius:RfH(56)/2,
      borderWidth:1.5,
      borderColor:'#E3E3E3'
  }, 
 removeStyle: { 
    backgroundColor:'rgba(240, 83, 83, 0.1)',
    borderRadius:RfH(8),
    height:RfH(30),
    marginTop:RfH(4),
    width:RfW(72),
    justifyContent:'center',
    alignItems:'center',
    
},
inputFocusedFontSize: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight:'bold'
  },
  inputUnfocusedFontSize: {
    fontSize: RFValue(14,STANDARD_SCREEN_SIZE),
    paddingTop: 0,
    color: 'rgba(0,0,0,0.5)',
    fontWeight:'bold'
  },
  inputTextContainer: {
    minHeight: RfH(40),
    backgroundColor:'#E9E9E9',
    // marginBottom: RfH(10),
    borderRadius:RfH(8),
    opacity:0.7,
    borderWidth:0.2,
    borderBottomWidth:0.6,
    borderColor:'rgba(0, 0, 0, 0.16)',
    borderBottomColor:'rgba(0, 0, 0, 0.16)',
    ...commonStyles.shadowButtonMid
  },
  inputTextColor: {
    color: '#000000',
    paddingBottom: 0,
  },
  friendListCon: { 
      paddingTop: RfH(0),
      paddingBottom:RfH(8),
    paddingHorizontal: RfW(0) 
},
activeFriendTabStyle:{
    // marginTop: RfH(8),
    // backgroundColor: '#FBA919',
    // height: RfH(2),
    // width: RfW(32),
    // justifyContent:'center',
    // alignItems:'center'
    borderBottomWidth:2,
    paddingBottom:2,
    borderBottomColor:'#4C70FF'
  },
  galleryImageContainer: {
    height: '100%',
    width: '100%',
    
  },
  
  
});

export default styles;
