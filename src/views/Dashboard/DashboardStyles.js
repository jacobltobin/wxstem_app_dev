import { StyleSheet } from 'react-native'
import { Fonts, Metrics, ApplicationStyles, Colors } from '../../themes'

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
    marginTop: 40,
    marginBottom: 40,
  },
  addStationButtonText: {
    ...Fonts.style.italic,
    color: Colors.moonGray,
    alignSelf: 'center',
    textAlign: 'center',
  },
  user_indicator: {
    backgroundColor: Colors.lightBlue,
    padding: 3,
  },
  user_indicator_text: {
    ...Fonts.style.detail,
    color: Colors.midGray,
    textAlign: 'center',
    fontSize: 12,
  },
})
