import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { Colors } from '../../themes'
import styles from './WeatherIconStyles.js'

const base = {
  night: {
    icon: '',
    map: [27, 29],
    style: {
      color: Colors.moonGray,
    },
  },
  sunny: {
    icon: '',
    map: [28, 30, 47],
    style: {
      color: Colors.orange,
    },
  },
  frosty: {
    icon: '',
    map: [13, 14, 15, 25],
    style: {
      color: Colors.white,
    },
  },
  windysnow: {
    icon: '',
    map: [],
    style: {
      color: Colors.white,
    },
  },
  showers: {
    icon: '',
    map: [],
    style: {
      color: Colors.blue,
    },
  },
  basecloud: {
    icon: '',
    map: [4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18, 24, 25, 35, 38, 40, 42, 47],
    style: {
      color: Colors.white,
    },
  },
  cloud: {
    icon: '',
    map: [26, 27, 28, 29, 30],
    style: {
      color: Colors.lightGray,
    },
  },
  rainy: {
    icon: '',
    map: [11, 12, 40],
    style: {
      color: Colors.blue,
    },
  },
  mist: {
    icon: '',
    map: [19, 20, 21, 22],
    style: {
      color: Colors.lightGray,
    },
  },
  windysnowcloud: {
    icon: '',
    map: [],
    style: {
      color: Colors.white,
    },
  },
  drizzle: {
    icon: '',
    map: [9],
    style: {
      color: Colors.blue,
    },
  },
  snowy: {
    icon: '',
    map: [16, 42],
    style: {
      color: Colors.white,
    },
  },
  sleet: {
    icon: '',
    map: [5, 6, 7, 8, 10, 18, 35],
    style: {
      color: Colors.white,
    },
  },
  moon: {
    icon: '',
    map: [31, 33],
    style: {
      color: Colors.moonGray,
    },
  },
  windyrain: {
    icon: '',
    map: [],
    style: {
      color: Colors.blue,
    },
  },
  hail: {
    icon: '',
    map: [17],
    style: {
      color: Colors.white,
    },
  },
  sunset: {
    icon: '',
    map: [],
    style: {
      color: Colors.orange,
    },
  },
  windyraincloud: {
    icon: '',
    map: [],
    style: {
      color: Colors.lightGray,
    },
  },
  sunrise: {
    icon: '',
    map: [],
    style: {
      color: Colors.orange,
    },
  },
  sun: {
    icon: '',
    map: [32, 34, 36],
    style: {
      color: Colors.orange,
    },
  },
  thunder: {
    icon: '',
    map: [4, 38, 47],
    style: {
      color: Colors.orange,
    },
  },
  windy: {
    icon: '',
    map: [24],
    style: {
      color: Colors.gray,
    },
  },
}

export default class WeatherIcon extends Component {
  static propTypes = {
    icon_code: PropTypes.string,
    style: PropTypes.object,
  }
  get_icons = icon_code => {
    let icons = []
    for (icon in base) {
      if (base[icon].map.indexOf(icon_code) > -1) {
        icons.push(base[icon])
      }
    }
    return icons
  }
  markup = icons => {
    const style_arr = [
      styles.overlapper_top,
      styles.default,
      styles.overlapper_top,
    ]
    if (icons.length > 1) {
      return icons.map((icon, index) => {
        return (
          <Text style={[style_arr[index], icon.style, this.props.style]}>
            {icon.icon}
          </Text>
        )
      })
    } else {
      return (
        <Text style={[styles.default, icons[0].style, this.props.style]}>
          {icons[0].icon}
        </Text>
      )
    }
  }
  render() {
    let result
    const icons = this.get_icons(this.props.icon_code)
    if (icons.length > 1) {
      result = (
        <View style={styles.overlapper}>
          {this.markup(icons)}
          {/* <Text style={styles.overlapper_top}>
            {base[this.props.name.split('-')[0]].icon}
          </Text>
          <Text style={styles.default}>
            {base[this.props.name.split('-')[1]].icon}
          </Text> */}
          {/* <Text style={styles.overlapper_top}>{base['basecloud'].icon}</Text>
          <Text style={styles.default}>{base['windy'].icon}</Text> */}
        </View>
      )
    } else {
      // result = <Text style={styles.default}>{base[this.props.name].icon}</Text>
      result = <View>{this.markup(icons)}</View>
    }
    return result
  }
}
