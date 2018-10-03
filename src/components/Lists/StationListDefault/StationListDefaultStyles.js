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
    paddingRight: 10,
    color: Colors.gray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  listItemText: {
    ...Fonts.style.normalBold,
    color: Colors.midGray,
  },
  listItemMeta: {
    ...Fonts.style.detail,
    color: Colors.midGray,
  },
  listItemMetaContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  loadingIconContainer: {
    marginTop: 75,
    alignSelf: 'center',
  },
  filterHeader: {
    flex: 1,
    flexDirection: 'column',
  },
})
