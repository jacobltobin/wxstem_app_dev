import React, { Component } from 'react'
import PropTypes from 'prop-types'
import APIActions, { APISelectors } from '../../../redux/APIRedux'
import { connect } from 'react-redux'

import { View, TouchableOpacity, Image, Text } from 'react-native'
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import StationListDefault from '../../Lists/StationListDefault/StationListDefault'
import Fade from '../../Fade/Fade'
import FadeOutOverlay from '../../FadeOutOverlay/FadeOutOverlay'

import styles from './SelectStationModalStyles'

class SelectStationModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
    navigation: PropTypes.object,
    request_all_stations: PropTypes.func.isRequired,
    stations: PropTypes.array,
    sectionedStations: PropTypes.array,
    isFetching: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      display_station_list: false,
    }
  }

  setDisplayStationListVisible = visible => {
    this.setState({
      display_station_list: visible,
    })
  }

  onSuccess = () => {
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
        />
      )
    } else {
      stationList = ''
    }
    return (
      <Modal
        animationIn={'fadeInUpBig'}
        animationInTiming={400}
        animationOut={'fadeOutDownBig'}
        animationOutTiming={400}
        backdropColor={'black'}
        backdropOpacity={0.85}
        backdropTransitionInTiming={200}
        isVisible={this.props.visible}
        avoidKeyboard
        onModalShow={() => {
          this.setDisplayStationListVisible(true)
        }}
        onModalHide={() => {
          this.setDisplayStationListVisible(false)
        }}
        onBackButtonPress={() => {
          this.props.close()
        }}
        onBackdropPress={() => {
          this.props.close()
        }}
      >
        <View style={styles.modal_inner_container}>
          <View style={styles.modal_header}>
            <Text style={styles.modal_header_text}>
              Add Stations to Dashboard
            </Text>
            <TouchableOpacity
              style={styles.modal_close}
              onPress={() => {
                this.props.close()
              }}
            >
              <Icon name="close" size={30} color="#ccc" />
            </TouchableOpacity>
          </View>
          <FadeOutOverlay
            visible={this.state.display_station_list}
            style={{
              backgroundColor: 'white',
              height: 100,
              width: 100,
              position: 'absolute',
            }}
          />
          {stationList}
        </View>
      </Modal>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectStationModal)
