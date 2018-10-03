import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { Header } from 'react-native-elements'
import {
  AddStationButton,
  Subheader,
  HeaderCenter,
  HeaderLeft,
} from '../../components'
import Stations from '../Stations/Stations'
import Station from '../Station/Station'

export default createStackNavigator(
  {
    Stations: { screen: Stations },
    Station: { screen: Station },
  },
  {
    initialRouteName: 'Stations',
    headerMode: 'none',
  },
)
