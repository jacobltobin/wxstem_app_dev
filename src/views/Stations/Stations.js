import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { HeaderCenter, StationListDefault } from '../../components'
import { NavigationActions } from 'react-navigation'
import StationActions, { StationSelectors } from '../../redux/APIRedux/Stations'
import { Header } from 'react-native-elements'
import ViewActions, { ViewSelectors } from '../../redux/ViewRedux'

// Styles
import { Colors } from '../../themes'

class Stations extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    set_selected_station: PropTypes.func,
    request_all_stations: PropTypes.func,
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
          onItemSelect={(handle, domainHandle) => {
            console.tron.log(handle)
            this.goToStation(handle, domainHandle)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
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
)(Stations)
