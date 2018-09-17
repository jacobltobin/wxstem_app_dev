import React, { Component } from 'react'
import {
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
import { TabNavigator } from 'react-navigation'
import { Input, Button } from 'react-native-elements'

// Styles
import styles from './LISUFStyles'

export class signInForm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {
    return (
      <View style={styles.LISUF_tabContainer}>
        <Input
          inputStyle={styles.LISUF_input}
          containerStyle={styles.LISUF_containerStyle}
          inputContainerStyle={styles.LISUF_inputContainerStyle}
          placeholder="username"
          leftIcon={{ type: 'font-awesome', name: 'user', color: '#ccc' }}
        />
        <Input
          inputStyle={styles.LISUF_input}
          containerStyle={styles.LISUF_containerStyle}
          inputContainerStyle={styles.LISUF_inputContainerStyle}
          placeholder="password"
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
        />
        <Button title="Sign In" buttonStyle={styles.LISUF_buttonStyle} />
      </View>
    )
  }
}

export class signUpForm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  calculateTabContainerStyles = () => {
    return {
      ...styles.LISUF_tabContainer,
      height: 150,
    }
  }

  render() {
    return (
      <View style={this.calculateTabContainerStyles()}>
        <Input
          inputStyle={styles.LISUF_input}
          containerStyle={styles.LISUF_containerStyle}
          inputContainerStyle={styles.LISUF_inputContainerStyle}
          placeholder="username"
          leftIcon={{ type: 'font-awesome', name: 'user', color: '#ccc' }}
        />
        <Input
          inputStyle={styles.LISUF_input}
          containerStyle={styles.LISUF_containerStyle}
          inputContainerStyle={styles.LISUF_inputContainerStyle}
          placeholder="password"
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
        />
        <Input
          inputStyle={styles.LISUF_input}
          containerStyle={styles.LISUF_containerStyle}
          inputContainerStyle={styles.LISUF_inputContainerStyle}
          placeholder="verify password"
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#ccc' }}
        />
        <Button title="Sign In" buttonStyle={styles.LISUF_buttonStyle} />
      </View>
    )
  }
}

export default TabNavigator(
  {
    'Sign In': signInForm,
    'Sign Up': signUpForm,
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      ...styles.LISUF_tabBarOptions,
    },
  },
)
