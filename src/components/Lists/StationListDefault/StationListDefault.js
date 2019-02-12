import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StationActions, { StationSelectors } from '../../../redux/StationsRedux'
import { createSectionedStations } from '../../../transforms/apiTransforms'

import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import StationListDefaultItem from './StationListDefaultItem'
import { abbreviationToFullName } from '../../../transforms/stateNameUtils'
import Swiper from 'react-native-swiper'

import styles from './StationListDefaultStyles'
import { Colors } from '../../../themes'

class StateListItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.state_list_item_touchable}
          onPress={() => this.props.onPress(this.props.title)}
        >
          <Text style={styles.state_list_item_text}>
            {abbreviationToFullName(this.props.title)}
          </Text>
          <Icon
            name={'angle-right'}
            type={'font-awesome'}
            size={18}
            color={Colors.midGray}
            containerStyle={{
              alignSelf: 'flex-end',
              paddingRight: 10,
              paddingBottom: 2,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

class StationListDefault extends Component {
  static propTypes = {
    is_fetching: PropTypes.bool,
    stations_fetched: PropTypes.bool,
    sectioned_stations: PropTypes.array,
    stripped_sectioned_stations: PropTypes.array,
    on_item_select: PropTypes.func,
    request_all_stations: PropTypes.func,
    stations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      filtering: false,
      filterText: '',
      filteredStations: null,
      noResults: null,
      swipeable: false,
      selectedState: null,
      stateDataLoading: false,
      selectedStateData: [
        {
          title: 'AL',
          data: [],
        },
      ],
      // stationListX: new Animated.Value(Metrics.screenWidth + 50),
    }
  }

  onChangeTextFunction = text => {
    this.setState({
      filterText: text,
    })
    if (text === '') {
      this.setState({
        filtering: false,
      })
    } else {
      this.searchFilterFunction(text)
    }
  }

  searchFilterFunction = text => {
    const newData = this.props.stations.filter(item => {
      const itemName = `${item.name.toUpperCase()}`
      const itemDomain = `${item.domain.toUpperCase()}`
      const textData = text.toUpperCase()
      if (itemName.indexOf(textData) < 0 && itemDomain.indexOf(textData) < 0) {
        return false
      }
      return true
    })
    if (newData.length === 0) {
      this.setState({
        filteredStations: this.props.sectioned_stations,
        filtering: false,
        noResults: true,
      })
    } else {
      this.setState({
        filteredStations: createSectionedStations(newData),
        filtering: true,
        noResults: false,
      })
    }
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

  renderFilterBar = () => {
    return (
      <View style={styles.filterHeader}>
        <SearchBar
          ref={ref => (this.searchbar = ref)}
          placeholder="Search"
          clearIcon={{ onPress: this.clear }}
          platform="default"
          containerStyle={styles.filter_bar_container}
          inputStyle={styles.filter_bar_input}
          inputContainerStyle={styles.filter_bar_input_container}
          round
          value={this.state.filterText}
          onChangeText={text => this.onChangeTextFunction(text)}
          onClear={this.onClearTextFunction}
          autoCorrect={false}
        />
        <View
          style={
            this.state.noResults ? styles.no_results : styles.no_results_hidden
          }
        >
          <Text style={styles.no_results_text}>
            No stations match your search...
          </Text>
        </View>
      </View>
    )
  }

  loadStations = () => {
    this.props.request_all_stations()
  }

  getStateEntry = state => {
    let results = this.props.sectioned_stations.filter(obj => {
      return obj.title === state
    })
    return results
  }

  onSwiperChanged = index => {
    if (index === 0) {
      this.setState({
        stateDataLoading: false,
        swipeable: false,
      })
    } else {
    }
  }

  toggleSection = title => {
    this.setState({
      // stateDataLoading: true,
      selectedState: title,
      selectedStateData: this.getStateEntry(title),
      swipeable: true,
    })
    this._swiper.scrollBy(1)
  }

  render() {
    let freshDataLoadingIndicator
    // if no station data then:
    if (this.props.stations_fetched == false && !this.props.is_fetching) {
      this.loadStations()
    }
    // if station data is fetching and their are no stations then:
    if (this.props.is_fetching && !this.props.stations) {
      return (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }

    // if station data is not fetching and stations are not fetched then:
    else if (!this.props.is_fetching && this.props.stations_fetched == false) {
      return <Text>Starting Load...</Text>
    }
    // finally now, if there is station data then:
    else {
      // if there is station data but we're fetching new stations
      if (this.props.stations && this.props.is_fetching) {
        freshDataLoadingIndicator = (
          <View style={styles.loading_icon_container}>
            <ActivityIndicator size="large" color={Colors.blue} />
          </View>
        )
      }
      // if not filtering, display regular state list
      let defaultListDisplay
      if (!this.state.filtering) {
        defaultListDisplay = (
          <FlatList
            data={this.props.stripped_sectioned_stations}
            renderItem={({ item }) => (
              <StateListItem onPress={this.toggleSection} title={item.title} />
            )}
          />
        )
        // if filtering, display filtered stations
      } else {
        defaultListDisplay = (
          <SectionList
            renderItem={({ item }) => (
              <StationListDefaultItem
                station={item}
                hidden={this.state.noResults}
                on_item_select={id => this.props.on_item_select(id)}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.filter_results_header}>
                <Text>{abbreviationToFullName(title)}</Text>
              </View>
            )}
            sections={this.state.filteredStations}
            keyExtractor={(item, index) => item + index}
            initialNumToRender={10}
          />
        )
      }
      return (
        <Swiper
          ref={swiper => {
            this._swiper = swiper
          }}
          containerStyle={styles.swipe_wrapper}
          showsPagination={false}
          scrollEnabled={this.state.swipeable}
          loop={false}
          onIndexChanged={index => this.onSwiperChanged(index)}
        >
          {/* STATE LIST */}
          <View style={styles.swiper_slide1}>
            {this.renderFilterBar()}
            {freshDataLoadingIndicator}
            {defaultListDisplay}
          </View>

          {/* STATION DETAIL LIST */}
          <View style={styles.swiper_slide2}>
            <SectionList
              renderItem={({ item }) => (
                <StationListDefaultItem
                  station={item}
                  hidden={this.state.noResults}
                  on_item_select={id => this.props.on_item_select(id)}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View>
                  <TouchableOpacity
                    style={styles.station_list_header}
                    onPress={() => this._swiper.scrollBy(-1)}
                  >
                    <Icon
                      name={'caret-left'}
                      type={'font-awesome'}
                      size={10}
                      color={Colors.midGray}
                      containerStyle={styles.station_list_item_icon}
                    />
                    <Text style={styles.station_list_header_text}>
                      {abbreviationToFullName(title)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              sections={this.state.selectedStateData}
              keyExtractor={(item, index) => item + index}
              initialNumToRender={10}
            />
          </View>
        </Swiper>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    stations: StationSelectors.selectStationsStrippedList(state),
    stripped_sectioned_stations: StationSelectors.selectStationsStrippedSectionedList(
      state,
    ),
    sectioned_stations: StationSelectors.selectStationsSectionedList(state),
    stations_fetched: StationSelectors.stationsFetched(state),
    is_fetching: StationSelectors.isFetchingStations(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_all_stations: () => dispatch(StationActions.requestAllStations()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDefault)
