import React, { Component } from "react"

import { View, Text, ScrollView, FlatList, TouchableHighlight, Alert } from "react-native"
import { NavigationPage } from "teaset"
import httpFetch from "../../httpFetch.js"
import Reader from "../reader/index"

export default class ChapterList extends NavigationPage {

  static defaultProps = {
    ...ChapterList.defaultProps,
    title: '目录',
    showBackButton: true
  };

  state = {
    list: [],
    chapterId: 0,
    index: 0
  }

  onDidFocus() {
    httpFetch.get("/api/chapter/list", { bookId: this.props.bookId, sort: 1 }).then(res => {
      this.setState({ list: res.data.list, chapterId: res.data.chapterId, index: res.data.index });
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  click = (id) => {
    this.navigator.replace({ view: <Reader bookId={this.props.bookId} id={id} /> });
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight onPress={() => this.click(item.id)} tyle={{ flex: 1 }}>
        <View key={item.id} style={styles.box}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ ...styles.text, color: item.id == this.state.chapterId ? "#DB4528" : "rgba(0,0,0,0.8)" }}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderPage() {
    const { list, index } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#f4f4f4" }}></View>}
          showsVerticalScrollIndicator={true}
          initialNumToRender={20}
          initialScrollIndex={index}
          getItemLayout={(data, index) => (
            { length: 51, offset: 51 * index, index }
          )}
          ref={ref => this.table = ref}
        />
        {/* {
          list.map(item => {
            return (
              <View style={styles.box} key={item.id}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{item.name}</Text>
              </View>
            )
          })
        } */}
      </View>
    )
  }
}

const styles = {
  box: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff"
  },
  text: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 16,
    fontWeight: "bold"
  }
}

