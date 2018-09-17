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
  logo: {
    flex: 1,
    marginTop: Metrics.doubleSection,
    // height: Metrics.images.logo,
    // width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
})
