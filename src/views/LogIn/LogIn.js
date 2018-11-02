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
  }

  constructor(props) {
    super(props)
    this.state = {
      uid_input: null,
      pwd_input: null,
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
    this.setState({ pwd_input: text })
  }

  login_user = () => {
    this.props.login_user({
      uid: this.state.uid_input,
      pwd: this.state.pwd_input,
    })
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
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
              />
              <Button
                title="Sign In"
                onPress={() => this.login_user()}
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
  return {}
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
