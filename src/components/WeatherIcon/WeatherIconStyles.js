import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../themes/'
import colors from '../../themes/Colors'

export default StyleSheet.create({
  default: {
    ...Fonts.style.weatherIcon,
    fontSize: 40,
  },
  overlapper_top: {
    ...Fonts.style.weatherIcon,
    fontSize: 40,
    position: 'absolute',
  },
})
