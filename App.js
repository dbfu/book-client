/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { Theme, TeaNavigator } from 'teaset';

Theme.set({
  tvBarBtnIconActiveTintColor: '#DB4528',
  tvBarBtnActiveTitleColor: '#DB4528',
  primaryColor: "#DB4528",
  backButtonTitle: "返回",
  navColor: "#e15955",
});

import Main from "./src/main"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <TeaNavigator rootView={<Main />} />
    );
  }
}
