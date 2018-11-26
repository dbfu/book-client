import React, { Component } from "react"

import { View, Text, TouchableHighlight, FlatList, Image, ActivityIndicator, Alert } from "react-native"
import { NavigationPage, Label } from "teaset"
import httpFetch from "../../httpFetch.js"
import BookDetail from "../book-detail/index"

var Dimensions = require('Dimensions');

export default class Bag extends NavigationPage {

  static defaultProps = {
    ...Bag.defaultProps,
    title: 'Me',
    showBackButton: false,
  };

  state = {
    list: [],
    refreshing: false,
    index: 0,
    loadding: false
  }

  componentDidMount() {
    httpFetch.get("/api/book/list", { page: 0 }).then(res => {
      this.setState({ list: res.data });
    })
  }

  press = (item) => {
    this.navigator.push({ view: <BookDetail title={item.name} id={item.id} /> })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight style={{ flex: 1 }} onPress={() => this.press(item)}>
        <View style={style.contaniner}>
          <Image
            style={{ width: 64, height: 80, marginTop: 10 }}
            source={{ uri: 'http://192.168.1.101:3000' + item.imageUrl }}
            resizeMode="stretch"
          />
          <View style={{ marginLeft: 10, marginTop: 10, flex: 1 }}>
            <Text allowFontScaling={false} style={{ flex: 1, fontSize: 16, fontWeight: "600", color: "#000" }}>{item.name}</Text>
            <Text allowFontScaling={false} style={{ flex: 1 }}>{item.author} | 已读:30%</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={{ flex: 1 }}>{item.lastChapterName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  refresh = () => {
    this.setState({ refreshing: true, index: 0 }, () => {
      this.getList(true);
    });

    // fetch('/api/book/list')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({ list: responseJson, refreshing: false });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  bottom = () => {
    return (
      this.state.loadding && <ActivityIndicator style={{ flex: 1 }} size="small" color="#ccc" />
    )
  }

  loadMore = () => {
    let { index, list, loadding } = this.state;

    if (loadding) return;
    // Alert.alert("more");
    this.setState({
      index: index + 1,
      loadding: true
    }, () => {
      this.getList();
    })
  }

  getList = (isRefresh) => {
    let { index, list } = this.state;

    httpFetch.get('/api/book/list', {
      page: index
    }).then(res => {
      if (isRefresh) {
        list = res.data;
      } else {
        list = [...list, ...res.data];
      }
      this.setState({ list, loadding: false, refreshing: false });
    })
      .catch((error) => {
        console.error(error);
      });
  }


  renderPage() {

    const { list, refreshing } = this.state;

    return (
      <View style={{ backgroundColor: "#fff" }}>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#f4f4f4" }}></View>}
          showsVerticalScrollIndicator={false}
          onRefresh={this.refresh}
          refreshing={refreshing}
          ListFooterComponent={this.bottom}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const style = {
  contaniner: {
    height: 100,
    flexDirection: 'row',
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingHorizontal: 10
  }
}