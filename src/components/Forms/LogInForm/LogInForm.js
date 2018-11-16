import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import APIActions, { APISelectors } from '../../../redux/APIRedux'

import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'

import styles from './LogInFormStyles'

// LogInForm - two input fields and a button
//    handles form validation and
//    submitting login request to api
//    pass on success from parent!
class LogInForm extends Component {
  static propTypes = {
    login_user: PropTypes.func,
    login_info: PropTypes.object,
    onSuccess: PropTypes.func,
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
    }
  }

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

  return_error = field => {
    switch (field) {
      case 'pwd':
        if (this.state.pwd_error) {
          return this.state.pwd_error_message
        } else if (
          this.props.login_info.api_error &&
          this.props.login_info.api_error.indexOf('password') > 0
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
          this.props.login_info.api_error &&
          this.props.login_info.api_error.indexOf('username') > 0
        ) {
          return 'this email is not registered with us'
        } else {
          return ''
        }
    }
  }

  render() {
    if (this.props.login_info.logged_in) {
      this.props.onSuccess()
    }
    return (
      <View style={styles.login_formContainer}>
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
        <Button
          title="Sign In"
          onPress={() => this.login_user()}
          disabled={this.state.uid_error || this.state.pwd_error}
          buttonStyle={styles.login_buttonStyle}
        />
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
)(LogInForm)
