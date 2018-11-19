import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  dashboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  addStationButton: {
    borderTopWidth: 20,
    backgroundColor: 'red',
  },
})
