import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Images } from '../../themes'

import styles from './HeaderCenterStyles'

export default class HeaderCenter extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    return (
      <View style={styles.headerCenterContainer}>
        <Image
          source={Images.logoIconWhite}
          style={styles.headerCenterLogo}
          resizeMode="stretch"
        />
        <Text style={styles.headerCenterText}>{this.props.title}</Text>
      </View>
    )
  }
}
