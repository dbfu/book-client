import React, { Component } from "react"

import { View, Text } from "react-native"
import { NavigationPage } from "teaset"

export default class Chat extends NavigationPage {

  static defaultProps = {
    ...Chat.defaultProps,
    title: '评论',
    showBackButton: true
  };

  renderPage() {
    return (
      <View style={{ backgroundColor: "#fff", marginTop: 20, marginLeft: 20 }}>
        <View style={styles.container}>
          <View style={styles.box}></View>
          <Text style={styles.text}>发生的时间和黄金时代是多少发生的时间和黄金时代是多少发生的时间和黄金时代是多少发生的时间和黄金时代是多少发生的时间和黄金时代是多少</Text>
        </View>
      </View>
    )
  }
}

const styles = {
  text: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#088cb7",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: "#fff",
    position:'absolute',
    maxWidth: 200,
    fontSize: 16
  },
  container: {
    position: "relative"
  },
  box: {
    position: "absolute",
    backgroundColor: "#088cb7",
    width: 16,
    height: 16,
    transform: [{ rotateZ: '45deg' }],
    top: 12,
    left: -6
  }
}