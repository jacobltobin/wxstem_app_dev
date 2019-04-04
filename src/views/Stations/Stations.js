import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { HeaderCenter, StationListDefault } from '../../components'
import { NavigationActions } from 'react-navigation'
import StationActions, { StationSelectors } from '../../redux/StationsRedux'
import { Header } from 'react-native-elements'
import AppStateActions from '../../redux/AppStateRedux'

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

  goToStation = id => {
    this.props.set_selected_station(id)
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
          on_item_select={id => {
            this.goToStation(id)
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
    request_all_stations: () => dispatch(StationActions.requestAll()),
    set_selected_station: id =>
      dispatch(AppStateActions.setSelectedStation(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stations)
