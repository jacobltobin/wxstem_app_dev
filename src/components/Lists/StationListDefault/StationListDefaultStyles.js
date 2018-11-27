import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../themes/'

export default StyleSheet.create({
  listItem: {
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
  filterHeader: {},
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
  stateListItem: {},
  stateListItemTouchable: {
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
  stateListItemText: {
    ...Fonts.style.all,
    color: Colors.midGray,
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  stationListHeader: {
    paddingLeft: 15,
    paddingTop: 11,
    paddingBottom: 11,
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.moonGray,
  },
  stationListHeaderText: {
    color: Colors.midGray,
    fontSize: 14,
    ...Fonts.style.normal,
  },
  searchBarContainer: {
    backgroundColor: Colors.lightGray,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.moonGray,
  },
  searchBarInput: {
    backgroundColor: Colors.lightGray,
    color: Colors.darkGray,
  },
  searchBarInputContainer: {
    backgroundColor: Colors.lightGray,
  },
  swipeWrapper: {
    flex: 1,
  },
  swiperSlide1: {
    flex: 1,
  },
  swiperSlide2: {
    flex: 1,
  },
})
