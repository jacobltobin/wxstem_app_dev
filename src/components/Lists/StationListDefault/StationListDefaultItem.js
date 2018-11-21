import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
// import { NavigationActions, withNavigation } from 'react-navigation'
import ViewActions, { ViewSelectors } from '../../../redux/ViewRedux'

import { Colors } from '../../../themes'
import styles from './StationListDefaultStyles'

class StationListDefaultItem extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    station: PropTypes.object.isRequired,
    set_selected_station: PropTypes.func,
    onPress: PropTypes.func,
    hidden: PropTypes.bool,
  }

  goBack = () => {
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    return (
      <View
        style={
          this.props.hidden ? styles.noResultsHidden : styles.listItemContainer
        }
      >
        <TouchableOpacity
          onPress={() =>
            this.props.onPress(
              this.props.station.handle,
              this.props.station.domainHandle,
            )
          }
          style={styles.listItem}
        >
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    set_selected_station: (handle, domainHandle) =>
      dispatch(ViewActions.setSelectedStation(handle, domainHandle)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDefaultItem)
