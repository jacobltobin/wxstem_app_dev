import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types'

import Dashboard from '../Dashboard/Dashboard'
import Stations from '../Stations/Stations'
import Learn from '../Stations/Stations'
import Tropical from '../Stations/Stations'

export default createBottomTabNavigator({
    Dashboard: Dashboard,
    Stations: Stations,
    Learn: Learn,
    Tropical: Tropical,
});