import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StationActions, {
  StationSelectors,
} from '../../../redux/APIRedux/Stations'
import { connect } from 'react-redux'
import ConfigActions from '../../../redux/ConfigRedux'

import { View, TouchableOpacity, Image, Text } from 'react-native'
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import StationListDefault from '../../Lists/StationListDefault/StationListDefault'

import styles from './SelectStationModalStyles'
import { Colors } from '../../../themes'

class SelectStationModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    navigation: PropTypes.object,
    stations: PropTypes.array,
    sectionedStations: PropTypes.array,
    isFetching: PropTypes.bool,
    addStationToDashboard: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      display_station_list: true,
      animationOut: 'fadeOutDownBig',
      animationOutTiming: 400,
      addedStation: false,
      stationSelected: {
        id: null,
      },
    }
  }

  onModalHide = () => {
    this.state.addedStation
      ? this.props.addStationToDashboard(this.state.stationSelected.id)
      : null
  }

  setDisplayStationListVisible = visible => {
    this.setState({
      display_station_list: visible,
    })
  }

  handleStationSelected = id => {
    this.setState({
      animationOut: 'fadeOutUpBig',
      animationOutTiming: 600,
      addedStation: true,
      stationSelected: {
        id: id,
      },
    })
    this.props.close()
  }
  closeWithoutAddingStation = () => {
    this.setState({
      addedStation: false,
    })
    this.props.close()
  }

  render() {
    let stationList
    if (this.state.display_station_list) {
      stationList = (
        <StationListDefault
          isFetching={this.props.isFetching}
          stations={this.props.stations}
          sectionedStations={this.props.sectionedStations}
          navigation={this.props.navigation}
          onItemSelect={id => {
            this.handleStationSelected(id)
          }}
        />
      )
    } else {
      stationList = ''
    }
    return (
      <Modal
        animationIn={'fadeInUpBig'}
        animationInTiming={400}
        animationOut={this.state.animationOut}
        animationOutTiming={this.state.animationOutTiming}
        backdropColor={'black'}
        backdropOpacity={0.85}
        backdropTransitionInTiming={200}
        isVisible={this.props.visible}
        avoidKeyboard
        onModalShow={() => {
          // this.setDisplayStationListVisible(true)
        }}
        onModalHide={() => {
          this.onModalHide()
        }}
        onBackButtonPress={() => {
          this.closeWithoutAddingStation()
        }}
        onBackdropPress={() => {
          this.closeWithoutAddingStation()
        }}
      >
        <View style={styles.modal_inner_container}>
          <View style={styles.modal_header}>
            <Text style={styles.modal_header_text}>
              Add Station to Dashboard
            </Text>
            <TouchableOpacity
              style={styles.modal_close}
              onPress={() => {
                this.closeWithoutAddingStation()
              }}
            >
              <Icon name="close" size={30} color={Colors.darkBlue} />
            </TouchableOpacity>
          </View>
          {stationList}
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    stations: StationSelectors.selectStationsStrippedList(state),
    sectionedStations: StationSelectors.selectStationsSectionedList(state),
    isFetching: StationSelectors.isFetchingStations(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addStationToDashboard: id =>
      dispatch(ConfigActions.addStationToDashboard(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStationModal)
