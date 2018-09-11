import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './SubheaderStyles'

export default class Subheader extends Component {
    static propTypes = {
        title: PropTypes.string
    }

    render() {
        return (
            <View style={styles.subheaderContainer}>
                <Text style={styles.subheaderText}>{this.props.title}</Text>
            </View>
        )
    }
}