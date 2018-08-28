import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './StationListDefaultStyles'

export default class StationListDefaultItem extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
  }
  render() {
    return <Text style={styles.listItem}>{this.props.station.name}</Text>
  }
}
