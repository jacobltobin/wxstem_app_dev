import { Fonts, Colors } from '../../themes'

export default {
  headerCenterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerCenterLogo: {
    width: 30,
    height: 30,
    marginRight: 6,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  headerCenterText: {
    ...Fonts.style.header,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
}
