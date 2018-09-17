import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

import Dashboard from '../Dashboard/Dashboard'
import Stations from '../Stations/Stations'
import Learn from '../Stations/Stations'
import Tropical from '../Stations/Stations'

import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './MainTabStyles'

import { Colors } from '../../themes'

export default createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
      }),
    },
    Stations: {
      screen: Stations,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="crosshairs" size={30} color={tintColor} />
        ),
      }),
    },
    Learn: {
      screen: Stations,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="book" size={30} color={tintColor} />
        ),
      }),
    },
    Tropical: {
      screen: Stations,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="life-ring" size={30} color={tintColor} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: Colors.white,
      inactiveBackgroundColor: Colors.blue,
      activeTintColor: Colors.white,
      activeBackgroundColor: Colors.darkBlue,
      tabStyle: styles.tabStyle,
      style: {
        backgroundColor: Colors.blue,
      },
    },
  },
)
