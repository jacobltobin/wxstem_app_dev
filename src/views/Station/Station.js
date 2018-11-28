import React, { Component } from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { ViewSelectors } from '../../redux/ViewRedux'
import { APISelectors } from '../../redux/APIRedux'

import { Header } from 'react-native-elements'
import { HeaderCenter, HeaderLeft } from '../../components'

import { Colors } from '../../themes'
import Styles from './StationStyles'

class Station extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    stationBaseData: PropTypes.object,
  }
  render() {
    goBack = () => {
      const backAction = NavigationActions.back()
      this.props.navigation.dispatch(backAction)
    }
    return (
      <View>
        <Header
          innerContainerStyles={Styles.headerInnerContainer}
          outerContainerStyles={Styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={<HeaderLeft icon="arrow-back" action={goBack} />}
          centerComponent={
            <HeaderCenter title={this.props.stationBaseData.name} />
          }
        />
        <ScrollView>
          <View>
            <Image
              style={{ height: 250, width: '100%', resizeMode: 'stretch' }}
              source={{
                uri:
                  'https://' +
                  this.props.stationBaseData.domain.handle +
                  '.weatherstem.com/skycamera/' +
                  this.props.stationBaseData.domain.handle +
                  '/' +
                  this.props.stationBaseData.handle +
                  '/cumulus/snapshot.jpg',
              }}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stationBaseData: APISelectors.selectStationByHandle(
      state,
      ViewSelectors.selectSelectedStation(state).handle,
      ViewSelectors.selectSelectedStation(state).domainHandle,
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Station)
