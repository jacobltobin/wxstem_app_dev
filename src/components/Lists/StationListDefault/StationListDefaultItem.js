import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from 'react-native'
import { Divider, Icon } from 'react-native-elements'

import { Colors } from '../../../themes'
import styles from './StationListDefaultStyles'

export default class StationListDefaultItem extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
  }
  render() {
    return (
      <View style={styles.listItemContainer}>
        <TouchableOpacity style={styles.listItem}>
          <View>
            <Text style={styles.listItemText}>{this.props.station.name}</Text>
            <View style={styles.listItemMetaContainer}>
              <Text style={styles.listItemMeta}>
                {this.props.station.domain.split(', ')[0] + ' '}
              </Text>
              <Text style={styles.listItemMeta}>
                {this.props.station.state}
              </Text>
            </View>
          </View>
          <View style={styles.listItemRightIconContainer}>
            <Icon
              type="font-awesome"
              name="angle-right"
              color={Colors.midGray}
            />
          </View>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: Colors.lightGray }} />
      </View>
    )
  }
}
