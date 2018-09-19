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
import { HeaderCenter } from '../../components'

// Styles
import styles from './LogInStyles'
import { Colors } from '../../themes'

class LogInView extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  goBack = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  render() {
    return (
      <View style={styles.login_Container}>
        <Header
          innerContainerStyles={styles.headerInnerContainer}
          outerContainerStyles={styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={{
            onPress: () => this.props.navigation.goBack(),
            icon: 'arrow-back',
            color: '#fff',
            size: 30,
          }}
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
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#ccc' }}
              />
              <Input
                inputStyle={styles.login_input}
                containerStyle={styles.login_containerStyle}
                inputContainerStyle={styles.login_inputContainerStyle}
                placeholder="password"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
              />
              <Button title="Sign In" buttonStyle={styles.login_buttonStyle} />
              {/* <TouchableOpacity>
                <Text>Forgot password</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Create Account</Text>
              </TouchableOpacity> */}
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInView)
