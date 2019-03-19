import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../themes/'

export default StyleSheet.create({
  loading_icon_container: {
    marginTop: 75,
    alignSelf: 'center',
  },

  // swiper
  swipe_wrapper: {
    flex: 1,
  },
  swiper_slide1: {
    flex: 1,
  },
  swiper_slide2: {
    flex: 1,
  },

  // filtering
  filter_bar_container: {
    backgroundColor: Colors.lightGray,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.moonGray,
  },
  filter_bar_input: {
    backgroundColor: Colors.lightGray,
    color: Colors.darkGray,
  },
  filter_bar_input_container: {
    backgroundColor: Colors.lightGray,
  },
  no_results_hidden: {
    height: 0,
  },
  no_results: {
    height: 35,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.washedRed,
  },
  no_results_text: {
    color: Colors.lightRed,
    fontSize: 12,
    justifyContent: 'center',
  },
  filter_results_header: {
    backgroundColor: Colors.lightGray,
    padding: 5,
    paddingLeft: 15,
  },

  // state list
  state_list_item_touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  state_list_item_text: {
    ...Fonts.style.all,
    color: Colors.midGray,
    fontSize: 18,
    alignSelf: 'flex-start',
  },

  // station list
  station_list_header: {
    paddingLeft: 15,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.moonGray,
  },
  station_list_header_text: {
    color: Colors.midGray,
    fontSize: 14,
    ...Fonts.style.normal,
  },

  // station list
  station_list_item: {
    width: Metrics.screenWidth,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    color: Colors.gray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  station_list_item_text: {
    ...Fonts.style.normalBold,
    color: Colors.midGray,
  },
  station_list_item_meta: {
    ...Fonts.style.detail,
    color: Colors.midGray,
  },
  station_list_item_meta_container: {
    flex: 1,
    flexDirection: 'row',
  },
  station_list_item_icon: {
    marginRight: 10,
    paddingTop: 7,
  },
  station_list_item_inactive: {
    width: Metrics.screenWidth,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    color: Colors.gray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
  },
})
