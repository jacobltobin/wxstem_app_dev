import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modal_inner_container: {
    backgroundColor: Colors.lightGray,
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  modal_header: {
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
  },
  modal_header_text: {
    ...Fonts.style.normalBold,
    color: Colors.white,
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 3,
  },
  modal_close: {
    height: 30,
  },
  login_Logo: {
    width: 280,
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})
