import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { DrawerContent } from '../../components'

// Styles
import { Fonts } from '../../themes'
import styles from './MainDrawerStyles'

// Screens
import Register from '../Register/Register'
import SignIn from '../SignIn/SignIn'
import Stations from '../Stations/Stations'
import MainTab from '../MainTab/MainTab'

const returnDrawerWidth = () => {
  return Dimensions.get('window').width * 0.888
}

export default createDrawerNavigator(
  {
    MainTab: {
      screen: MainTab,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        drawerLabel: 'Sign In',
      },
    },
    CreateAccount: {
      screen: SignIn,
      navigationOptions: {
        drawerLabel: 'Create Account',
      },
    },
    NotificationsSettings: {
      screen: SignIn,
      navigationOptions: {
        drawerLabel: 'Notifications',
      },
    },
    Settings: {
      screen: SignIn,
      navigationOptions: {
        drawerLabel: 'Settings',
      },
    },
    Help: {
      screen: SignIn,
    },
    Contact: {
      screen: SignIn,
      navigationOptions: {
        drawerLabel: 'Contact WeatherSTEM',
      },
    },
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      labelStyle: styles.drawerItemText,
    },
    initialRouteName: 'MainTab',
    headerMode: 'none',
    drawerWidth: returnDrawerWidth(),
  },
)
