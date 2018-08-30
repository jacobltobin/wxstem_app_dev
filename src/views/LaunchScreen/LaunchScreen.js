import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

import { Images } from '../../themes'
import { RoundedButton } from '../../components'

// TMP
import DevscreensButton from '../../../ignite/DevScreens/DevscreensButton'

// Styles
import styles from './LaunchScreenStyles'

// Screens
import Register from '../Register/Register'
import Stations from '../Stations/Stations'
import SignIn from '../SignIn/SignIn'

class LaunchScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  openRegister = () => {
    this.props.navigation.navigate('Register')
  }

  openStations = () => {
    this.props.navigation.navigate('Stations')
  }

  openSignIn = () => {
    this.props.navigation.navigate('SignIn')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
          </View>

          <View style={styles.section}>
            <RoundedButton onPress={this.openStations}>Stations</RoundedButton>
            <RoundedButton onPress={this.openSignIn}>Sign In</RoundedButton>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    Register: { screen: Register },
    SignIn: { screen: SignIn },
    Stations: { screen: Stations },
  },
  {
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
  },
)
