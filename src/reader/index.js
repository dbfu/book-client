import React, { Component } from "react"

import { View, Text, TouchableHighlight, TouchableOpacity, StatusBar, FlatList, Image, ActivityIndicator, Alert, findNodeHandle, ScrollView, WebView } from "react-native"

import { BasePage, Label, NavigationBar, Drawer } from "teaset"
import httpFetch from "../../httpFetch.js"

import images from "../images/index"

export default class Reader extends BasePage {

  state = {
    texts: [],
    sort: 0,
    nextChapter: "",
    afterChapter: "",
    loading: false,
    show: false
  }

  onDidFocus() {

    this.setState({ loading: true });
    httpFetch.get("/api/chapter/content", { bookId: this.props.bookId, id: this.props.id }).then(res => {
      let contents = this._getContent(res.data.content);
      this.webView.postMessage(JSON.stringify({ type: "content", data: contents, name: res.data.name }));
      this.setState({ loading: false });
      httpFetch.get("/api/chapter/next", { sort: res.data.sort }).then(response => {
        let contents = this._getContent(response.data.content);
        this.setState({ sort: response.data.sort });
        this.webView.postMessage(JSON.stringify({ type: "next", data: contents, name: response.data.name }));
        // this.webView.postMessage(JSON.stringify({ type: "content", data: contents })); 
      })
    })
  }

  _getContent = (str) => {
    if (str) {
      str = str.toString().split("\n");

      var contents = [];

      str.map(o => {
        o = o.trim().replace(/\s+/g, "");
        if (o) {
          contents.push("　　" + o);
        }
      });

      return contents;
    } else {
      return "";
    }
  }

  message = (e) => {
    let type = e.nativeEvent.data;
    if (type == "getNextChapter") {
      httpFetch.get("/api/chapter/next", { sort: this.state.sort }).then(res => {
        let contents = this._getContent(res.data.content);
        this.setState({ sort: res.data.sort })
        this.webView.postMessage(JSON.stringify({ type: "next", data: contents, name: res.data.name }));
      })
    } else if (type == "showSetting") {
      this.setState({ show: true });
    } else if (type == "hideSetting") {
      this.setState({ show: false });
    } else if (type == "back") {
      this.navigator.pop();
    }
  }

  // _getContent = (content) => {
  //   var strs = content.toString().split("\n");
  //   Alert.alert(strs.length.toString());
  // }

  renderPage() {
    const { texts, loading, show } = this.state;

    return (
      <View style={styles.contaniner}>
        <StatusBar hidden={!show}></StatusBar>
        {loading && <View style={styles.bgBox}>
          <ActivityIndicator size="large" color="#DB4528" animating={true}></ActivityIndicator>
        </View>}
        <WebView
          originWhitelist={['*']}
          source={require("./index.html")}
          javaScriptEnabled
          ref={ref => this.webView = ref}
          onMessage={this.message}
        />
      </View>
    )
  }
}
const styles = {
  contaniner: {
    flex: 1
  },
  bgBox: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  bg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  contentBox: {
    flex: 1
  },
  content: {
    fontSize: 18,
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    lineHeight: 35
  }
}