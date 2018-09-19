import { Fonts, Colors } from '../../themes'

export default {
  headerCenterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerCenterLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerCenterText: {
    ...Fonts.style.header,
  },
}
