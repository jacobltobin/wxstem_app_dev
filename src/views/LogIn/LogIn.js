import React, { Component } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Header } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Images } from '../../themes'
import { HeaderCenter, HeaderLeft, LogInForm } from '../../components'
import APIActions, { APISelectors } from '../../redux/APIRedux'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './LogInStyles'
import { Colors } from '../../themes'

class LogInView extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      uid_input: '',
      pwd_input: '',
      uid_error: true,
      uid_error_message: '',
      uid_error_from_blur: false,
      pwd_error: true,
      pwd_error_message: '',
      pwd_error_from_blur: false,
    }
  }

  goBack = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  logged_in_now_navigate = () => {
    const loggedInAction = NavigationActions.navigate({ routeName: 'MainTab' })
    this.props.navigation.dispatch(loggedInAction)
  }

  render() {
    if (this.props.login_info.logged_in) {
      this.logged_in_now_navigate()
    }
    return (
      <View style={styles.login_Container}>
        <Header
          innerContainerStyles={styles.headerInnerContainer}
          outerContainerStyles={styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={
            <HeaderLeft icon={'arrow-back'} action={this.goBack} />
          }
          centerComponent={<HeaderCenter title="Log In" />}
        />

        <ScrollView style={styles.login_scrollView}>
          <KeyboardAvoidingView enabled behavior="position">
            <View style={styles.login_LogoContainer}>
              <Image
                source={Images.logoIconTypeColor}
                style={styles.login_Logo}
                resizeMode="stretch"
              />
            </View>
            <LogInForm />
          </KeyboardAvoidingView>
        </ScrollView>
        <TouchableOpacity style={styles.login_signUpButton}>
          <Text style={styles.login_signUpButtonText}>
            No Account? Sign up.
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    login_info: APISelectors.selectLoginInfo(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login_user: event => dispatch(APIActions.loginUser(event)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInView)
