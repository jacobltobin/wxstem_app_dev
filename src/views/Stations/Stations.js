import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { HeaderCenter, StationListDefault } from '../../components'
import { NavigationActions } from 'react-navigation'
import APIActions, { APISelectors } from '../../redux/APIRedux'
import { Header } from 'react-native-elements'
import ViewActions, { ViewSelectors } from '../../redux/ViewRedux'

// Styles
import { Colors } from '../../themes'

class Stations extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    request_all_stations: PropTypes.func.isRequired,
    stations: PropTypes.array,
    sectionedStations: PropTypes.array,
    isFetching: PropTypes.bool,
    set_selected_station: PropTypes.func,
  }

  goBack = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  goToStation = (handle, domainHandle) => {
    this.props.set_selected_station(handle, domainHandle)
    this.props.navigation.navigate('Station')
  }

  loadStations = () => {
    this.props.request_all_stations()
  }

  render() {
    if (this.props.stations == null && !this.props.isFetching) {
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
          centerComponent={<HeaderCenter title={'Stations'} />}
          rightComponent={{
            onPress: () => this.loadStations(),
            icon: 'refresh',
            color: '#fff',
            size: 30,
          }}
        />
        <StationListDefault
          isFetching={this.props.isFetching}
          stations={this.props.stations}
          sectionedStations={this.props.sectionedStations}
          navigation={this.props.navigation}
          onPress={(handle, domainHandle) =>
            this.goToStation(handle, domainHandle)
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stations: APISelectors.selectStationsStrippedList(state),
    sectionedStations: APISelectors.selectStationsSectionedList(state),
    isFetching: APISelectors.isFetchingStations(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_all_stations: () => dispatch(APIActions.requestAllStations()),
    set_selected_station: (handle, domainHandle) =>
      dispatch(ViewActions.setSelectedStation(handle, domainHandle)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations)
