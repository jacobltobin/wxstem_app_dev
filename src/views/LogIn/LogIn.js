import React, { Component } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Images } from '../../themes'
import { NavigationActions } from 'react-navigation'
import { HeaderCenter, HeaderLeft } from '../../components'
import APIActions, { APISelectors } from '../../redux/APIRedux'

// Styles
import styles from './LogInStyles'
import { Colors } from '../../themes'

class LogInView extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    login_user: PropTypes.func,
    login_info: PropTypes.object,
  }

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

  uid_input_change = text => {
    this.setState({ uid_input: text })
  }
  pwd_input_change = text => {
    if (this.state.pwd_error_from_blur) {
      this.setState({
        pwd_input: text,
        pwd_error: text.length > 5 ? false : true,
        pwd_error_message:
          text.length > 5 ? '' : 'password should be longer than 5 characters',
      })
    } else {
      this.setState({
        pwd_input: text,
        pwd_error: text.length > 5 ? false : true,
      })
    }
  }

  validate = (field, text) => {
    switch (field) {
      case 'uid':
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
          this.setState({
            uid_error: false,
            uid_error_message: '',
          })
        } else {
          this.setState({
            uid_error: true,
            uid_error_message: 'invalid email address',
          })
        }
        break
      case 'pwd':
        if (text.length < 6) {
          this.setState({
            pwd_error: true,
            pwd_error_message: 'password should be longer than 5 characters',
            pwd_error_from_blur: true,
          })
        } else {
          this.setState({
            pwd_error: false,
            pwd_error_message: '',
            pwd_error_from_blur: false,
          })
        }
      // todo ~~
    }
  }

  setError = (field, message) => {}

  login_user = () => {
    if (!this.state.uid_error && !this.state.pwd_error) {
      this.props.login_user({
        uid: this.state.uid_input,
        pwd: this.state.pwd_input,
      })
    } else {
      // UI something ?
    }
  }

  render() {
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
            <View style={styles.login_formContainer}>
              <Input
                inputStyle={styles.login_input}
                containerStyle={styles.login_containerStyle}
                inputContainerStyle={styles.login_inputContainerStyle}
                placeholder="email"
                onBlur={() => {
                  this.validate('uid', this.state.uid_input)
                }}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.uid_error_message}
                autoCapitalize={'none'}
                onChangeText={text => this.uid_input_change(text)}
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#ccc' }}
              />
              <Input
                inputStyle={styles.login_input}
                containerStyle={styles.login_containerStyle}
                inputContainerStyle={styles.login_inputContainerStyle}
                secureTextEntry
                onChangeText={text => this.pwd_input_change(text)}
                placeholder="password"
                onBlur={() => {
                  this.validate('pwd', this.state.pwd_input)
                }}
                errorStyle={{ color: 'red' }}
                errorMessage={this.state.pwd_error_message}
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
              />
              <Button
                title="Sign In"
                onPress={() => this.login_user()}
                disabled={this.state.uid_error || this.state.pwd_error}
                buttonStyle={styles.login_buttonStyle}
              />
            </View>
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
