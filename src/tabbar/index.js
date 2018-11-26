import React, { Component } from "react"
import { View, Text } from "react-native"
import { Button } from "teaset"


export default class Tabbar extends Component {
  render() {
    return (
      <View>
        <Button type='primary' size='xl' title='Default' onPress={() => alert('Hello world')} />
      </View>
    )
  }
}