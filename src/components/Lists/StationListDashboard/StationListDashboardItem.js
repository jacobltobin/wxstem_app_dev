import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import ViewActions, { ViewSelectors } from '../../../redux/ViewRedux'

import { Colors } from '../../../themes'
import styles from './StationListDashboardStyles'
import { StationSelectors } from '../../../redux/APIRedux/Stations'
import { SwipeListView } from 'react-native-swipe-list-view'

class StationListDashboardItem extends Component {
  static propTypes = {
    station: PropTypes.object,
    handle: PropTypes.string,
    domainHandle: PropTypes.string,
    station: PropTypes.object,
    navigation: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      editing_view: false,
    }
  }

  goToStation = (handle, domainHandle) => {
    this.props.set_selected_station(handle, domainHandle)
    this.props.navigation.navigate('Station')
  }

  handleLongPress = (handle, domainHandle) => {
    this.setState({
      editing_view: true,
    })
  }

  render() {

    let editing_controls
    if (this.state.editing_view) {
      editing_controls = (
        <View style={styles.list_item_editing_container}>
          <TouchableOpacity>
            <Icon
              name={'move'}
              type={'font-awesome'}
              size={40}
              color={Colors.red}
            />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => { this.handleLongPress() }}
          onPress={() => {
            this.goToStation(
              this.props.handle,
              this.props.domainHandle)
          }}
          activeOpacity={0.7}
        >
          <View style={styles.list_item_container}>
            <View style={styles.list_item_info_container}>
              <View style={styles.list_item_name_container}>
                <Text style={styles.list_item_station_name_text}>
                  {this.props.station.name}
                </Text>
              </View>
            </View>
            {editing_controls}
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
          </View >
        </TouchableOpacity>

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
  return {
    set_selected_station: (handle, domainHandle) =>
      dispatch(ViewActions.setSelectedStation(handle, domainHandle)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboardItem)
