import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StationActions, {
  StationSelectors,
} from '../../../redux/APIRedux/Stations'
import ConfigActions, { ConfigSelectors } from '../../../redux/ConfigRedux'

import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import StationListDashboardItem from './StationListDashboardItem'
import { abbreviationToFullName } from '../../../transforms/stateNameUtils'
import Swiper from 'react-native-swiper'

import styles from './StationListDashboardStyles'
import { Colors } from '../../../themes'

class StationListDashboard extends Component {
  static propTypes = {
    set_selected_station: PropTypes.func,
    request_all_stations: PropTypes.func,
    dashboard_stations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  clear = () => {
    this.searchbar.clear()
  }

  onClearTextFunction = () => {
    this.setState({
      noResults: false,
      filtering: false,
    })
  }

  loadStations = () => {
    this.props.request_all_stations()
  }

  getStateEntry = state => {
    let results = this.props.sectionedStations.filter(obj => {
      return obj.title === state
    })
    return results
  }

  render() {
    // if no station data then:
    if (this.props.stationsFetched == false && !this.props.isFetching) {
      this.loadStations()
    }
    // if station data is fetching then:
    if (this.props.isFetching) {
      return (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }
    // if station data is not fetching and stations are not fetched then:
    else if (!this.props.isFetching && this.props.stationsFetched == false) {
      return <Text>Starting Load...</Text>
    }
    // finally now, if there is station data then:
    else {
      return (
        <View>
          <FlatList
            data={this.props.dashboard_stations}
            renderItem={({ item }) => (
              <StationListDashboardItem
                onPress={this.toggleSection}
                handle={item.handle}
                domainHandle={item.domainHandle}
              />
            )}
          />
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    dashboard_stations: ConfigSelectors.selectDashboardStations(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_all_stations: () => dispatch(StationActions.requestAllStations()),
    set_selected_station: (handle, domainHandle) =>
      dispatch(ViewActions.setSelectedStation(handle, domainHandle)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboard)
