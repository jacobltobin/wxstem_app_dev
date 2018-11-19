import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modal_inner_container: {
    backgroundColor: Colors.white,
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  modal_header_text: {
    ...Fonts.style.normalBold,
    color: Colors.midGray,
    alignSelf: 'flex-start',
    textAlign: 'left',
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
  login_LogoContainer: {},
  login_signUpButton: {
    alignSelf: 'stretch',
    padding: 20,
    paddingTop: 0,
  },
  login_signUpButtonText: {
    ...Fonts.style.detail,
    color: Colors.gray,
  },
})
