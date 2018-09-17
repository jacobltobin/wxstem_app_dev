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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationActions } from 'react-navigation'

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
      <View style={styles.loginContainer}>
        <Header
          innerContainerStyles={styles.headerInnerContainer}
          outerContainerStyles={styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={{
            onPress: () => this.props.navigation.goBack(),
            icon: 'arrow-left',
            color: '#fff',
            size: 30,
          }}
          centerComponent={{
            text: 'Log In',
            style: styles.headerInnerContainer,
          }}
        />

        <ScrollView>
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => this.props.navigation.replace('Register')}
            >
              <Text style={styles.sectionText}>
                Don't have an account? Register.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
