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
  sectionHeader: {
    ...Fonts.style.detail,
    color: Colors.midGray,
    backgroundColor: Colors.lightGray,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  filterButtons: {},
  listItemContainerCollapsed: {
    height: 0,
  },
  noResultsHidden: {
    height: 0,
  },
  noResults: {
    height: 35,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.washedRed,
  },
  noResultsText: {
    color: Colors.lightRed,
    fontSize: 12,
    justifyContent: 'center',
  },
})
