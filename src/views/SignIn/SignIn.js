import React, { Component } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Images } from '../../themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './SignInStyles'

class SignInView extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  goBack = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainContainer}>

        <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>

        <ScrollView style={styles.container}>

          <View style={styles.section}>
            <Text style={[styles.titleText, styles.sectionText]}>Sign In</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.replace('Register')}
            >
              <Text style={styles.sectionText}>
                Don't have an account? Register.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
)(SignInView)
