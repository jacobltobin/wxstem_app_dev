import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subheaderContainer: {
    backgroundColor: Colors.lightGray,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
  },
  subheaderText: {
    ...Fonts.style.detailBold,
    color: Colors.black60,
  }
})
