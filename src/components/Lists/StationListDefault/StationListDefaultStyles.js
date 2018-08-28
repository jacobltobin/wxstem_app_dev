import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../themes/'

export default StyleSheet.create({
  listContainer: {
    width: Metrics.screenWidth,
    paddingTop: 20,
    backgroundColor: Colors.white,
  },
  listItem: {
    width: Metrics.screenWidth,
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.black,
  },
})
