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
import LogIn from '../LogIn/LogIn'
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
    LogIn: {
      screen: LogIn,
      navigationOptions: {
        drawerLabel: 'Log In',
      },
    },
    CreateAccount: {
      screen: LogIn,
      navigationOptions: {
        drawerLabel: 'Create Account',
      },
    },
    NotificationsSettings: {
      screen: LogIn,
      navigationOptions: {
        drawerLabel: 'Notifications',
      },
    },
    Settings: {
      screen: LogIn,
      navigationOptions: {
        drawerLabel: 'Settings',
      },
    },
    Help: {
      screen: LogIn,
    },
    Contact: {
      screen: LogIn,
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
