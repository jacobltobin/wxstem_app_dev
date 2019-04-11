import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  sensor_label: {
    ...Fonts.style.detailBold,
  },

  swiper_wrapper: {
    height: 250,
    marginBottom: 30,
    overflow: 'hidden',
  },
  slide1: {},
  slide2: {},
  slide3: {},
  text: {},

  slide_title: {
    backgroundColor: Colors.lightBlue,
    padding: 3,
  },
  slide_title_text: {
    ...Fonts.style.detail,
    color: Colors.midGray,
    textAlign: 'center',
    fontSize: 12,
  },
})
