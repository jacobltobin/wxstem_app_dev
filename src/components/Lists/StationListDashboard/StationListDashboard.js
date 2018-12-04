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
  StyleSheet
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import StationListDashboardItem from './StationListDashboardItem'
import { abbreviationToFullName } from '../../../transforms/stateNameUtils'
import { SwipeListView } from 'react-native-swipe-list-view';

import styles from './StationListDashboardStyles'
import { Colors } from '../../../themes'

class StationListDashboard extends Component {
  static propTypes = {
    set_selected_station: PropTypes.func,
    request_all_stations: PropTypes.func,
    dashboard_stations: PropTypes.array,
    navigation: PropTypes.object,
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
          <SwipeListView
            useFlatList
            data={this.props.dashboard_stations}
            renderItem={(data, rowMap) => {
              return (
                <View style={styles.swipe_item_row_front}>
                  <StationListDashboardItem
                    handle={data.item.handle}
                    domainHandle={data.item.domainHandle}
                    navigation={this.props.navigation}
                  />
                </View>
              )
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.swipe_item_row_back}>
                <Text>Left</Text>
                <Text style={styles.swipe_item_remove}>Remove{"\n"}from{"\n"}dashboard</Text>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
          {/* <FlatList
            data={this.props.dashboard_stations}
            renderItem={({ item }) => (
              <StationListDashboardItem
                handle={item.handle}
                domainHandle={item.domainHandle}
                navigation={this.props.navigation}
              />
            )}
          /> */}
        </View>
      )
    }
  }
}

const stylesz = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    // height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  },
});

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
