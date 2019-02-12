import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import PrimaryNav from '../../navigation/AppNavigation'
import { connect } from 'react-redux'
import StartupActions from '../../redux/StartupRedux'
import ReduxPersist from '../../config/ReduxPersist'

// Styles
import styles from './RootContainerStyles'

class RootContainer extends Component {
  static propTypes = {
    startup: PropTypes.func,
  }

  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <PrimaryNav />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer)
