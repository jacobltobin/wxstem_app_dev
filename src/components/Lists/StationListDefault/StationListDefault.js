import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ActivityIndicator,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import StationListDefaultItem from './StationListDefaultItem'
import { abbreviationToFullName } from '../../../transforms/stateNameUtils'
import APIActions, { APISelectors } from '../../../redux/APIRedux'
import Swiper from 'react-native-swiper'

import Styles from './StationListDefaultStyles'
import { Colors, Metrics } from '../../../themes'

const swiperStyles = StyleSheet.create({})

class StateListItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
  }
  render() {
    return (
      <View style={Styles.stateListItem}>
        <TouchableOpacity
          style={Styles.stateListItemTouchable}
          onPress={() => this.props.onPress(this.props.title)}
        >
          <Text style={Styles.stateListItemText}>
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
    isFetching: PropTypes.bool,
    stationsFetched: PropTypes.bool,
    sectionedStations: PropTypes.array,
    strippedSectionedStations: PropTypes.array,
    onItemSelect: PropTypes.func,
    request_all_stations: PropTypes.func,
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
    this.searchFilterFunction(text)
  }

  searchFilterFunction = text => {
    // const newData = this.props.stations.filter(item => {
    //   const itemName = `${item.name.toUpperCase()}`
    //   const itemDomain = `${item.domain.toUpperCase()}`
    //   const textData = text.toUpperCase()
    //   if (itemName.indexOf(textData) < 0 && itemDomain.indexOf(textData) < 0) {
    //     return false
    //   }
    //   return true
    // })
    // if (newData.length === 0) {
    //   this.setState({
    //     filteredStations: this.props.sectionedStations,
    //     filtering: false,
    //     noResults: true,
    //   })
    // } else {
    //   this.setState({
    //     filteredStations: apiTransforms.createSectionedStations(newData),
    //     filtering: true,
    //     noResults: false,
    //   })
    // }
  }

  clear = () => {
    this.searchbar.clear()
  }

  onClearTextFunction = () => {
    this.setState({
      filteredStations: this.props.sectionedStations,
      filtering: false,
    })
  }

  renderSearchBar = () => {
    return (
      <View style={Styles.filterHeader}>
        <SearchBar
          ref={ref => (this.searchbar = ref)}
          placeholder="Search"
          clearIcon={{ onPress: this.clear }}
          platform="default"
          containerStyle={Styles.searchBarContainer}
          inputStyle={Styles.searchBarInput}
          inputContainerStyle={Styles.searchBarInputContainer}
          round
          value={this.state.filterText}
          onChangeText={text => this.onChangeTextFunction(text)}
          onClear={this.onClearTextFunction}
          autoCorrect={false}
        />
        <View
          style={
            this.state.noResults ? Styles.noResults : Styles.noResultsHidden
          }
        >
          <Text style={Styles.noResultsText}>
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
    let results = this.props.sectionedStations.filter(obj => {
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
    // if no station data then:
    if (this.props.stationsFetched == false && !this.props.isFetching) {
      this.loadStations()
    }
    // if station data is fetching then:
    if (this.props.isFetching) {
      return (
        <View style={Styles.loadingIconContainer}>
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
        <Swiper
          ref={swiper => {
            this._swiper = swiper
          }}
          containerStyle={Styles.swipeWrapper}
          showsPagination={false}
          scrollEnabled={this.state.swipeable}
          loop={false}
          onIndexChanged={index => this.onSwiperChanged(index)}
        >
          {/* STATE LIST */}
          <View style={Styles.swiperSlide1}>
            {this.renderSearchBar()}
            <FlatList
              data={this.props.strippedSectionedStations}
              renderItem={({ item }) => (
                <StateListItem
                  onPress={this.toggleSection}
                  title={item.title}
                />
              )}
            />
          </View>

          {/* STATION DETAIL LIST */}
          <View style={Styles.swiperSlide2}>
            <SectionList
              renderItem={({ item }) => (
                <StationListDefaultItem
                  station={item}
                  hidden={this.state.noResults}
                  onItemSelect={() => this.props.onItemSelect}
                />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View>
                  <TouchableOpacity
                    style={Styles.stationListHeader}
                    onPress={() => this._swiper.scrollBy(-1)}
                  >
                    <Icon
                      name={'caret-left'}
                      type={'font-awesome'}
                      size={10}
                      color={Colors.midGray}
                      containerStyle={{ marginRight: 10, paddingTop: 7 }}
                    />
                    <Text style={Styles.stationListHeaderText}>
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
    strippedSectionedStations: APISelectors.selectStationsStrippedSectionedList(
      state,
    ),
    sectionedStations: APISelectors.selectStationsSectionedList(state),
    stationsFetched: APISelectors.stationsFetched(state),
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
)(StationListDefault)
