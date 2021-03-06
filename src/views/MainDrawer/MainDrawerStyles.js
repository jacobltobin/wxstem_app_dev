import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
  drawerItemText: {
    ...Fonts.style.drawerItem,
    color: Colors.midGray,
  },
})
