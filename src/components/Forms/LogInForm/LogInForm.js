import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActions, { UserSelectors } from '../../../redux/UserRedux'

import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { OpenURLButton } from '../../Buttons'

import styles from './LogInFormStyles'
import Colors from '../../../themes/Colors'

// LogInForm -
//    handles form validation and
//    submitting login request to api
//    also is create acct form
//    pass on success func from parent!
class LogInForm extends Component {
  static propTypes = {
    login_user: PropTypes.func,
    create_user: PropTypes.func,
    user: PropTypes.object,
    clear_log_in_error: PropTypes.func,
    onSuccess: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      creating_account: false,

      uid_input: '',
      uid_error: true,
      uid_error_message: '',
      uid_error_from_blur: false,

      pwd_input: '',
      pwd_error: true,
      pwd_error_message: '',
      pwd_error_from_blur: false,

      pwd_verify_input: '',
      pwd_verify_error: true,
      pwd_verify_error_: '',
      pwd_verify_error_from_blur: false,

      first_name_input: '',
      first_name_error: true,
      first_name_error_: '',
      first_name_error_from_blur: false,

      last_name_input: '',
      last_name_error: true,
      last_name_error_: '',
      last_name_error_from_blur: false,
    }
  }

  uid_input_change = text => {
    if (this.props.user.api_error) {
      this.props.clear_log_in_error()
    }
    this.setState({ uid_input: text })
  }
  first_name_input_change = text => {
    this.setState({
      first_name_input: text,
    })
  }
  last_name_input_change = text => {
    this.setState({
      last_name_input: text,
    })
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
      if (this.props.user.api_error) {
        this.props.clear_log_in_error()
      }
      this.setState({
        pwd_input: text,
        pwd_error: text.length > 5 ? false : true,
      })
    }
  }
  pwd_verify_input_change = text => {
    if (this.state.pwd_error_from_blur) {
      this.setState({
        pwd_verify_input: text,
        pwd_verify_error: text != this.state.pwd_input ? true : false,
        pwd_verify_error_message:
          text != this.state.pwd_input ? 'passwords do not match' : '',
      })
    } else {
      this.setState({
        pwd_verify_input: text,
        pwd_verify_error: text != this.state.pwd_input ? true : false,
      })
    }
  }

  validate = (field, text, fromBlur) => {
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
          this.uid_input_component.shake()
        }
        break
      case 'pwd':
        if (text.length < 6) {
          this.setState({
            pwd_error: true,
            pwd_error_message: 'password should be longer than 5 characters',
            pwd_error_from_blur: true,
          })
          this.pwd_input_component.shake()
        } else {
          this.setState({
            pwd_error: false,
            pwd_error_message: '',
            pwd_error_from_blur: false,
          })
        }
        break
      case 'first_name':
        if (text.length < 1) {
          this.setState({
            first_name_error: true,
            first_name_error_message: 'first name is required',
            first_name_error_from_blur: true,
          })
          this.first_name_input_component.shake()
        } else {
          this.setState({
            first_name_error: false,
            first_name_error_message: '',
            first_name_error_from_blur: false,
          })
        }
        break
      case 'last_name':
        if (text.length < 1) {
          this.setState({
            last_name_error: true,
            last_name_error_message: 'last name is required',
            last_name_error_from_blur: true,
          })
          this.last_name_input_component.shake()
        } else {
          this.setState({
            last_name_error: false,
            last_name_error_message: '',
            last_name_error_from_blur: false,
          })
        }
        break
      case 'pwd_verify':
        if (text != this.state.pwd_input) {
          this.setState({
            pwd_verify_error: true,
            pwd_verify_error_message: 'passwords do not match',
            pwd_verify_error_from_blur: fromBlur,
          })
          if (fromBlur) {
            this.pwd_verify_input_component.shake()
          }
        } else {
          this.setState({
            pwd_verify_error: false,
            pwd_verify_error_message: '',
            pwd_verify_error_from_blur: false,
          })
        }
        break
    }
  }

  login_user = () => {
    if (!this.state.uid_error && !this.state.pwd_error) {
      this.props.login_user(this.state.uid_input, this.state.pwd_input)
    } else {
      // UI something ?
    }
  }

  create_user = () => {
    if (
      !this.state.uid_error &&
      !this.state.first_name_error &&
      !this.state.last_name_error &&
      !this.state.pwd_error &&
      !this.state.pwd_verify_error
    ) {
      this.props.create_user(
        this.state.uid_input,
        this.state.pwd_input,
        this.state.first_name_input,
        this.state.last_name_input,
      )
    }
  }

  return_error = field => {
    switch (field) {
      case 'pwd':
        if (this.state.pwd_error) {
          return this.state.pwd_error_message
        } else if (
          this.props.user.api_error &&
          this.props.user.api_error.indexOf('password') > 0
        ) {
          return 'Incorrect password'
        } else {
          return ''
        }
        break
      case 'uid':
        if (this.state.uid_error) {
          return this.state.uid_error_message
        } else if (
          this.props.user.api_error &&
          this.props.user.api_error.indexOf('username') > 0
        ) {
          return 'this email is not registered with us'
        } else if (
          this.props.user.api_error &&
          this.props.user.api_error.indexOf('exists') > 0
        ) {
          return 'email already registered'
        } else {
          return ''
        }
        break
      case 'first_name':
        if (this.state.first_name_error) {
          return this.state.first_name_error_message
        } else {
          return ''
        }
        break
      case 'last_name':
        if (this.state.last_name_error) {
          return this.state.last_name_error_message
        } else {
          return ''
        }
        break
      case 'pwd_verify':
        if (this.state.pwd_verify_error) {
          return this.state.pwd_verify_error_message
        } else {
          return ''
        }
    }
  }

  render() {
    const creating_account = this.state.creating_account
    let name_inputs,
      password_verify_input,
      form_submit_button,
      form_toggle,
      forgot_password,
      activityIndicator

    if (creating_account) {
      forgot_password = ''
      name_inputs = (
        <View style={styles.name_inputs_container}>
          <Input
            ref={input => (this.first_name_input_component = input)}
            inputStyle={styles.name_input}
            containerStyle={styles.name_input_containerStyle}
            inputContainerStyle={styles.login_inputContainerStyle}
            onChangeText={text => this.first_name_input_change(text)}
            placeholder="first name"
            onBlur={() => {
              this.validate('first_name', this.state.first_name_input)
            }}
            errorStyle={{ color: 'red' }}
            errorMessage={this.return_error('first_name')}
            leftIcon={{
              type: 'font-awesome',
              name: 'address-card',
              color: '#ccc',
              size: 14,
            }}
          />
          <Input
            ref={input => (this.last_name_input_component = input)}
            inputStyle={styles.name_input}
            containerStyle={styles.name_input_containerStyle}
            inputContainerStyle={styles.login_inputContainerStyle}
            onChangeText={text => this.last_name_input_change(text)}
            placeholder="last name"
            onBlur={() => {
              this.validate('last_name', this.state.last_name_input)
            }}
            errorStyle={{ color: 'red' }}
            errorMessage={this.return_error('last_name')}
          />
        </View>
      )
      password_verify_input = (
        <Input
          ref={input => (this.pwd_verify_input_component = input)}
          inputStyle={styles.login_input}
          containerStyle={styles.login_containerStyle}
          inputContainerStyle={styles.login_inputContainerStyle}
          secureTextEntry
          onChangeText={text => this.pwd_verify_input_change(text)}
          placeholder="verify password"
          onBlur={() => {
            this.validate('pwd_verify', this.state.pwd_verify_input, true)
          }}
          errorStyle={{ color: 'red' }}
          errorMessage={this.return_error('pwd_verify')}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
        />
      )
      form_submit_button = (
        <Button
          title="Create Account"
          onPress={() => this.create_user()}
          disabled={
            this.state.uid_error ||
            this.state.first_name_error ||
            this.state.last_name_error ||
            this.state.pwd_error ||
            this.state.pwd_verify_error ||
            this.state.uid_input.length < 1 ||
            this.state.first_name_input.length < 1 ||
            this.state.last_name_input.length < 1 ||
            this.state.pwd_input.length < 1 ||
            this.state.pwd_verify_input.length < 1 ||
            this.state.pwd_input !== this.state.pwd_verify_input
          }
          buttonStyle={styles.login_buttonStyle}
        />
      )
      form_toggle = (
        <TouchableOpacity
          style={styles.login_signUpButton}
          onPress={() => {
            this.props.clear_log_in_error()
            this.setState({
              creating_account: false,
            })
          }}
        >
          <Text style={styles.login_signUpButtonText}>
            Already have an account? Sign In.
          </Text>
        </TouchableOpacity>
      )
    } else {
      name_inputs = ''
      password_verify_input = ''
      form_submit_button = (
        <Button
          title="Sign In"
          onPress={() => this.login_user()}
          disabled={this.state.uid_error || this.state.pwd_error}
          buttonStyle={styles.login_buttonStyle}
        />
      )
      form_toggle = (
        <TouchableOpacity
          style={styles.login_signUpButton}
          onPress={() => {
            this.props.clear_log_in_error()
            this.setState({
              creating_account: true,
            })
          }}
        >
          <Text style={styles.login_signUpButtonText}>
            No Account? Sign up.
          </Text>
        </TouchableOpacity>
      )
      forgot_password = (
        <OpenURLButton
          text={'Forgot Password'}
          url={'https://leon.weatherstem.com/forgot'}
          style={{ color: Colors.moonGray, textAlign: 'right', marginTop: 10 }}
        />
      )
    }

    // redirect on login success
    if (this.props.user.logged_in) {
      this.props.onSuccess()
    }

    if (this.props.user.fetching) {
      activityIndicator = (
        <ActivityIndicator
          size="large"
          style={{ paddingTop: 20 }}
          color={Colors.blue}
        />
      )
    } else {
      activityIndicator = ''
    }

    return (
      <View style={styles.login_formContainer}>
        {activityIndicator}
        <Input
          ref={input => (this.uid_input_component = input)}
          inputStyle={styles.login_input}
          containerStyle={styles.login_containerStyle}
          inputContainerStyle={styles.login_inputContainerStyle}
          placeholder="email"
          onBlur={() => {
            this.validate('uid', this.state.uid_input)
          }}
          errorMessage={this.return_error('uid')}
          errorStyle={{ color: 'red' }}
          autoCapitalize={'none'}
          onChangeText={text => this.uid_input_change(text)}
          leftIcon={{ type: 'font-awesome', name: 'user', color: '#ccc' }}
        />
        {name_inputs}
        <Input
          ref={input => (this.pwd_input_component = input)}
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
          errorMessage={this.return_error('pwd')}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
        />
        {forgot_password}
        {password_verify_input}
        {form_submit_button}
        {form_toggle}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: UserSelectors.selectLoginInfo(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login_user: (uid, pwd) => dispatch(UserActions.loginUser(uid, pwd)),
    create_user: (uid, pwd, first_name, last_name) =>
      dispatch(UserActions.createUser(uid, pwd, first_name, last_name)),
    clear_log_in_error: event => dispatch(UserActions.clearLogInError(event)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInForm)
