import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backButton: {
    position: 'absolute',
    paddingTop: 60,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  logo: {
    marginTop: 40,
    height: Metrics.images.medium,
    resizeMode: 'contain',
  },
})
