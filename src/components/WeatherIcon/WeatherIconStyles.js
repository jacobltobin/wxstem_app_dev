import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../themes/'
import colors from '../../themes/Colors'

export default StyleSheet.create({
  default: {
    ...Fonts.style.weatherIcon,
  },
  overlapper_top: {
    ...Fonts.style.weatherIcon,
    position: 'absolute',
  },
})
