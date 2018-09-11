import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

// Styles
import styles from './MainDrawerStyles'

// Screens
import Register from '../Register/Register'
import Stations from '../Stations/Stations'
import MainTab from '../MainTab/MainTab'

export default createDrawerNavigator(
  {
    MainTab: { screen: MainTab },
    Register: { screen: Register },
  },
  {
    initialRouteName: 'MainTab',
    headerMode: 'none',
  },
)
