import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { Header } from 'react-native-elements'
import { Subheader } from '../../components'
import { AddStationButton } from '../../components'
import { HeaderCenter } from '../../components'
import { HeaderLeft } from '../../components'

// Styles
import { Colors } from '../../themes'
import Styles from './DashboardStyles'

class Dashboard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {
    const openDrawer = () => {
      this.props.navigation.toggleDrawer()
    }
    // console.log(this.props.navigation)
    // const openDrawer = function() {
    //     return this.navigation.navigate("DrawerOpen")
    // }
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
          <Subheader title={'Stations'} />
          <AddStationButton />

          <Subheader title={'Notifications'} />
        </ScrollView>
      </View>
    )
  }
}

export default createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
)
