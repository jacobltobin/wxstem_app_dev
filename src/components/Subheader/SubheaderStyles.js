import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subheaderContainer: {
      backgroundColor: Colors.lightGray,
      padding: 17,
  },
  subheaderText: {
    color: Colors.black60,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
