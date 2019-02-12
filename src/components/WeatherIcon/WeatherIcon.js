import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import styles from './WeatherIconStyles.js'

const base = {
  night: '',
  sunny: '',
  frosty: '',
  windysnow: '',
  showers: '',
  basecloud: '',
  cloud: '',
  rainy: '',
  mist: '',
  windysnowcloud: '',
  drizzle: '',
  snowy: '',
  sleet: '',
  moon: '',
  windyrain: '',
  hail: '',
  sunset: '',
  windyraincloud: '',
  sunrise: '',
  sun: '',
  thunder: '',
  windy: '',
}

export default class WeatherIcon extends Component {
  static propTypes = {
    name: PropTypes.string,
  }
  render() {
    let result
    if (this.props.name.split('-').length > 1) {
      result = (
        <View style={styles.overlapper}>
          <Text style={styles.overlapper_top}>
            {base[this.props.name.split('-')[0]]}
          </Text>
          <Text style={styles.default}>
            {base[this.props.name.split('-')[1]]}
          </Text>
        </View>
      )
    } else {
      result = <Text style={styles.default}>{base[this.props.name]}</Text>
    }
    return result
  }
}
