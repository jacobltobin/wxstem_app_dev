import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../themes/'

export default StyleSheet.create({
  listContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.white,
  },
  listItem: {
    width: Metrics.screenWidth,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    color: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  listItemText: {
    ...Fonts.style.normal,
  },
})
