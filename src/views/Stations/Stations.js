import React, { Component } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { RoundedButton, StationListDefault } from '../../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationActions } from 'react-navigation'
import APIActions, { APISelectors } from '../../redux/APIRedux'
import { Header } from 'react-native-elements'

// Styles
import styles from './StationsStyles'
import { Colors } from '../../themes'

class Stations extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    request_all_stations: PropTypes.func.isRequired,
    stationsArray: PropTypes.array,
    isFetching: PropTypes.bool,
  }

  goBack = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  loadStations = () => {
    this.props.request_all_stations()
  }

  render() {
    if (this.props.stationsArray == null && !this.props.isFetching) {
      this.loadStations()
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          backgroundColor={Colors.blue.toString()}
          leftComponent={{
            onPress: () => this.props.navigation.toggleDrawer(),
            icon: 'menu',
            color: '#fff',
            size: 30,
          }}
          centerComponent={{
            text: 'Stations',
            style: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
          }}
          rightComponent={{
            onPress: () => this.loadStations(),
            icon: 'refresh',
            color: '#fff',
            size: 30,
          }}
        />
        <StationListDefault
          isFetching={this.props.isFetching}
          stationsArray={this.props.stationsArray}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stationsArray: APISelectors.selectStations(state),
    isFetching: APISelectors.isFetchingStations(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_all_stations: () => dispatch(APIActions.requestAllStations()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations)
