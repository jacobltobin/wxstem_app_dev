import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subheaderContainer: {
      backgroundColor: Colors.lightGray,
      padding: 17,
  },
  subheaderText: {
    ...Fonts.style.subHeader,
    color: Colors.black60,
  }
})
