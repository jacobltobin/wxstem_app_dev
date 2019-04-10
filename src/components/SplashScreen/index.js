import React, { Component } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'

import { Colors, Images } from '../../themes'

export default class SplashScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.blue,
        }}
      >
        <View style={{ width: 200 }}>
          <Image
            source={Images.logoIconTypeWhite}
            style={{ width: '100%' }}
            resizeMode={'contain'}
            resizeMethod={'resize'}
          />
          <ActivityIndicator size={'small'} color={Colors.white} />
        </View>
      </View>
    )
  }
}
