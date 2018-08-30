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

// Styles
import styles from './StationsStyles'

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
      <KeyboardAvoidingView style={styles.mainContainer}>
        <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={[styles.titleText, styles.sectionText]}>Stations</Text>
            <RoundedButton onPress={this.loadStations}>
              Refresh Stations
            </RoundedButton>
            <StationListDefault
              isFetching={this.props.isFetching}
              stationsArray={this.props.stationsArray}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
