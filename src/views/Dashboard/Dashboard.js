import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Header, Icon } from 'react-native-elements'
import {
  SelectStationModal,
  Subheader,
  HeaderCenter,
  HeaderLeft,
} from '../../components'
import APIActions, { APISelectors } from '../../redux/APIRedux'

// Styles
import { Colors } from '../../themes'
import Styles from './DashboardStyles'

class Dashboard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    login_info: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      select_station_modal_visible: false,
    }
  }

  handle_add_station_press = () => {
    this.setState({
      select_station_modal_visible: true,
    })
  }
  set_select_station_modal_visible = visible => {
    this.setState({
      select_station_modal_visible: visible,
    })
  }

  render() {
    const is_logged_in = this.props.login_info.logged_in

    const openDrawer = () => {
      this.props.navigation.toggleDrawer()
    }

    return (
      <View style={Styles.dashboardContainer}>
        <Header
          innerContainerStyles={Styles.headerInnerContainer}
          outerContainerStyles={Styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={<HeaderLeft icon="menu" action={openDrawer} />}
          centerComponent={<HeaderCenter title="Dashboard" />}
        />
        <ScrollView>
          <Subheader title={'My Stations'} />
          <View style={Styles.addStationButton}>
            <TouchableOpacity
              onPress={() => this.handle_add_station_press()}
              activeOpacity={0.5}
            >
              <Icon
                name={'plus-circle'}
                type={'font-awesome'}
                size={100}
                color={Colors.lightGray}
              />
              <Text style={Styles.addStationButtonText}>
                Add stations {'\n'}to your dashboard
              </Text>
            </TouchableOpacity>
          </View>
          <Subheader title={'Notifications'} />
        </ScrollView>
        <SelectStationModal
          visible={this.state.select_station_modal_visible}
          close={() => this.set_select_station_modal_visible(false)}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    login_info: APISelectors.selectLoginInfo(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // login_user: event => dispatch(APIActions.loginUser(event)),
    // create_user: event => dispatch(APIActions.createUser(event)),
    // clear_log_in_error: event => dispatch(APIActions.clearLogInError(event)),
  }
}

connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export default createStackNavigator(
  {
    Dashboard: { screen: connectedDashboard },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
)
