import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Images } from '../../themes'
import { Icon } from 'react-native-elements'

import styles from './HeaderLeftStyles'

export default class HeaderLeft extends Component {
  static propTypes = {
    icon: PropTypes.string,
    action: PropTypes.func,
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.headerCenterContainer}
        onPress={this.props.action}
      >
        <Icon name={this.props.icon} size={30} color="#fff" />
      </TouchableOpacity>
    )
  }
}
