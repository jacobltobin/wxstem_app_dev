import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  login_Container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  login_formContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.white,
  },
  login_Logo: {
    width: 175,
    height: 175,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  login_LogoContainer: {
    backgroundColor: Colors.lightGray,
  },
  login_buttonStyle: {
    marginTop: 35,
    alignSelf: 'stretch',
    marginBottom: 25,
    backgroundColor: Colors.blue,
  },
  login_scrollView: {
    backgroundColor: Colors.lightGray,
  },
  login_formLabel: {
    color: Colors.nearBlack,
  },
  login_input: {
    color: Colors.nearBlack,
    ...Fonts.style.normal,
    alignSelf: 'stretch',
  },
  login_containerStyle: {
    marginTop: 20,
    borderBottomWidth: 0,
    borderBottomColor: Colors.white,
  },
  login_inputContainerStyle: {
    borderBottomColor: Colors.lightGray,
  },
  login_tabContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 30,
    borderBottomLeftRadius: Metrics.buttonRadius,
    borderBottomRightRadius: Metrics.buttonRadius,
  },
  login_signUpButton: {
    alignSelf: 'stretch',
    borderTopWidth: 1,
    backgroundColor: Colors.white,
    borderTopColor: Colors.lightGray,
    padding: 20,
  },
  login_signUpButtonText: {
    ...Fonts.style.detail,
    color: Colors.gray,
  },
})
