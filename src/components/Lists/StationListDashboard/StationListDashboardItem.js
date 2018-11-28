import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import ViewActions, { ViewSelectors } from '../../../redux/ViewRedux'

import { Colors } from '../../../themes'
import styles from './StationListDashboardStyles'
import { StationSelectors } from '../../../redux/APIRedux/Stations'

class StationListDashboardItem extends Component {
  static propTypes = {
    station: PropTypes.object,
    onItemSelect: PropTypes.func,
    handle: PropTypes.string,
    domainHandle: PropTypes.string,
    station: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.list_item_container}>
        <View style={styles.list_item_info_container}>
          <Text style={styles.list_item_station_name_text}>
            {this.props.station.name}
          </Text>
        </View>
        <Image
          style={styles.list_item_image}
          source={{
            uri:
              'https://' +
              this.props.station.domain.handle +
              '.weatherstem.com/skycamera/' +
              this.props.station.domain.handle +
              '/' +
              this.props.station.handle +
              '/cumulus/snapshot.jpg',
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    station: StationSelectors.selectStationByHandle(
      state,
      props.handle,
      props.domainHandle,
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboardItem)
