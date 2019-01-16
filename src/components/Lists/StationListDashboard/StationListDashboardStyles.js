import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../themes/'
import colors from '../../../themes/Colors';

export default StyleSheet.create({
  list_item_container: {
    height: 250,
  },
  list_item_image: {
    height: 250,
    width: '100%',
    resizeMode: 'stretch',
    position: 'absolute',
    zIndex: 0,
  },
  list_item_info_container: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  list_item_name_container: {
    backgroundColor: Colors.white80,
    padding: 5,
    width: '100%',
    shadowOffset: { width: 0, height: 5, },
    shadowColor: colors.black10,
    shadowOpacity: 1.0,
  },
  list_item_station_name_text: {
    color: Colors.black50,
    ...Fonts.style.detail,
  },
  list_item_editing_container: {
    zIndex: 2,
    backgroundColor: Colors.black20,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  swipe_item_remove: {
    textAlign: 'right',
    backgroundColor: Colors.red,
    fontSize: 12,
    padding: 10,
    color: Colors.white
  },
  swipe_item_row_front: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  swipe_item_row_back: {
    backgroundColor: Colors.darkRed,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swipe_item_remove_icon: {
    paddingRight: 25
  }
})
