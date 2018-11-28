import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../themes/'

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
    zIndex: 1,
    padding: 15,
  },
  list_item_station_name_text: {
    color: Colors.white,
    ...Fonts.style.subHeader,
  },
})
