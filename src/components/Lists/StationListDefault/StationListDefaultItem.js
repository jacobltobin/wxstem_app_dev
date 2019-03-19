import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native'
import { Divider, Icon } from 'react-native-elements'

import { Colors } from '../../../themes'
import styles from './StationListDefaultStyles'

export default class StationListDefaultItem extends Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    on_item_select: PropTypes.func,
    hidden: PropTypes.bool,
    active: PropTypes.bool,
  }

  onPress = () => {
    this.props.on_item_select(this.props.station.id)
  }

  render() {
    return (
      <View
        style={
          this.props.hidden
            ? styles.no_results_hidden
            : styles.station_list_item_container
        }
      >
        <TouchableOpacity
          onPress={this.props.active ? () => this.onPress() : null}
          style={
            this.props.active
              ? styles.station_list_item
              : styles.station_list_item_inactive
          }
          activeOpacity={this.props.active ? 0.2 : 1}
        >
          <View>
            <Text style={styles.station_list_item_text}>
              {this.props.station.name}
            </Text>
            <View style={styles.station_list_item_meta_container}>
              <Text style={styles.station_list_item_meta}>
                {this.props.station.domain.split(', ')[0] + ' '}
              </Text>
              <Text style={styles.station_list_item_meta}>
                {this.props.station.state}
              </Text>
            </View>
          </View>
          <View>
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
