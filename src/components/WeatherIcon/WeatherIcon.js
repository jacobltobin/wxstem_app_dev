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

// my $icon_map = {
//   chanceflurries => [ 41, 46 ],
//   chancerain     => [ 39, 45 ],
//   chancesleet    => [],
//   chancesnow     => [],
//   chancetstorms => [ 37, 38, 47 ],
//   clear         => [ 31, 33, 34 ],
//   cloudy        => [26],
//   flurries => [ 13, 14, 15, 25 ],
//   fog      => [20],
//   hazy         => [ 21, 22 ],
//   mostlycloudy => [ 27, 28 ],
//   mostlysunny  => [],
//   partlycloudy => [ 29, 30 ],
//   partlysunny  => [],
//   rain         => [ 12, 40 ],
//   snow  => [ 16, 42, 43 ],
//   sleet => [ 5,  6,  7, 8, 10, 17, 18, 35 ],
//   sunny             => [ 32, 36 ],
//   tstorms           => [ 3,  4 ],
//   drizzle           => [9],
//   drizzly           => [],
//   showers           => [11],
//   windycloudy       => [19],
//   windypartlycloudy => [ 23, 24 ],
//   windyrain         => [],
//   windystorm        => [ 1,  2 ]
// };

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
