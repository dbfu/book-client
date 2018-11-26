import React, { Component } from "react"

import { View, Text, TouchableHighlight, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert, findNodeHandle, ScrollView, RefreshControl } from "react-native"
import { BasePage, Label, NavigationBar, Toast } from "teaset"
import httpFetch from "../../httpFetch.js"
import Books from "../books/index"

import { BlurView } from 'react-native-blur';
import Reader from "../reader/index"
import Chat from "../chat/index.js"
import ChapterList from "../chapter-list/index"

import images from "../images/index.js"


// import images from "../images/index"

var Dimensions = require('Dimensions');

export default class BookDetail extends BasePage {

  static defaultProps = {
    ...BookDetail.defaultProps,
    title: '',
    showBackButton: true,
    navigationBarInsets: false
  };

  state = {
    info: {},
    loadding: true,
    freshing: false,
    viewRef: null,
    opacity: 0,
    alikes: [],
    randoms: []
  }

  onDidFocus = () => {
    httpFetch.get("/api/book/query/" + this.props.id).then(res => {
      this.setState({ info: res.data, loadding: false });
    })
    httpFetch.get("/api/book/alike").then(res => {
      this.setState({ alikes: res.data });
    })
    httpFetch.get("/api/book/random").then(res => {
      this.setState({ randoms: res.data });
    })
  }

  _onRefresh = () => {
    this.setState({ freshing: true });
    httpFetch.get("/api/book/query/" + this.props.id).then(res => {
      this.setState({ info: res.data, freshing: false });
    })
  }

  press = (item) => {
    this.navigator.push({ view: <Books /> })
  }

  bottom = () => {
    return (
      this.state.loadding && <ActivityIndicator style={{ flex: 1 }} size="small" color="#ccc" />
    )
  }

  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  renderLoading = () => {
    return <ActivityIndicator size="large" color="#DB4528" />;
  }

  scroll = (e) => {

    let opacity = e.nativeEvent.contentOffset.y / (230 - 64);

    this.setState({
      opacity
    })
  }

  _onPressButton = () => {
    this.navigator.pop();
  }

  _read = () => {
    this.navigator.push({ view: <Reader bookId={this.props.id} /> });
  }

  _collect = () => {
    Toast.message("收藏成功！");
  }

  _toComment = () => {
    this.navigator.push({ view: <Chat bookId={this.props.id} /> });
  }

  _renderDesc = () => {
    const { loadding, info } = this.state;
    return (
      <View style={styles.box}>
        <Text style={{ ...styles.boxText, ...styles.boxTitle }}>简介</Text>
        <Text style={{ ...styles.boxText, ...styles.boxContent }}>{"     " + info.desc}</Text>
      </View>
    )
  }

  _toChapterList = () => {
    this.navigator.push({ view: <ChapterList bookId={this.props.id} /> });
  }

  _renderChapter = () => {
    const { loadding, info } = this.state;
    return (
      <TouchableOpacity onPress={this._toChapterList} activeOpacity={0.9} style={styles.chpaterBox}>
        <Text style={{ ...styles.boxText, ...styles.chpaterName }}>目录</Text>
        <View style={styles.rightBox}>
          <Text style={{ ...styles.boxText, ...styles.chpaterCount }}>共{info.chapterLength}章</Text>
          <Image style={styles.leftIcon} source={{ uri: images.leftIcon }}></Image>
        </View>
      </TouchableOpacity>
    )
  }

  _renderComment = () => {
    const { loadding, info } = this.state;
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.chpaterBox} onPress={this._toComment}>
        <Text style={{ ...styles.boxText, ...styles.chpaterName }}>评论<Text style={{ fontSize: 14, color: "rgba(0,0,0,0.4)" }}>(200条)</Text></Text>
        <View style={styles.rightBox}>
          <Text style={{ ...styles.boxText, ...styles.chpaterCount }}>20人正在讨论</Text>
          <Image style={styles.leftIcon} source={{ uri: images.leftIcon }}></Image>
        </View>
      </TouchableOpacity>
    )
  }

  _renderAlike = () => {
    const { loadding, info, alikes } = this.state;
    return (
      <View style={styles.box}>
        <Text style={{ ...styles.boxText, ...styles.boxTitle }}>相似书籍</Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          {alikes.map(item => {
            return (
              <TouchableOpacity onPress={() => this._toDetail(item)} key={item.id} style={{ paddingTop: 10, paddingLeft: 8, paddingBottom: 10, paddingRight: 8, flex: 1 }}>
                <Image style={{ resizeMode: "stretch", flex: 1, height: 94 }} source={{ uri: 'http://192.168.1.101:3000' + item.imageUrl }}></Image>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ ...styles.boxText, marginTop: 2 }}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  _renderLove = () => {
    const { loadding, info, randoms } = this.state;
    return (
      <View style={styles.box}>
        <Text style={{ ...styles.boxText, ...styles.boxTitle }}>猜你喜欢</Text>
        <View style={{ flexDirection: "row", flex: 1 }}>
          {randoms.map(item => {
            return (
              <TouchableOpacity onPress={() => this._toDetail(item)} key={item.id} style={{ paddingTop: 10, paddingLeft: 8, paddingBottom: 10, paddingRight: 8, flex: 1 }}>
                <Image style={{ resizeMode: "stretch", flex: 1, height: 94 }} source={{ uri: 'http://192.168.1.101:3000' + item.imageUrl }}></Image>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ ...styles.boxText, marginTop: 2 }}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  _toDetail = (item) => {
    this.navigator.push({ view: <BookDetail title={item.name} id={item.id} /> })
  }

  renderContent = () => {
    const { loadding, info, freshing } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={freshing}
            onRefresh={this._onRefresh}
          />
        }
        onScroll={this.scroll}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 50 }}>
        <Image
          style={{ height: this.state.viewRef ? 230 : 0, resizeMode: "cover" }}
          source={{ uri: 'http://192.168.1.101:3000' + info.imageUrl }}
          onLoadEnd={this.imageLoaded}
          ref={(img) => { this.backgroundImage = img; }}
        />
        {this.state.viewRef && <BlurView viewRef={this.state.viewRef} blurType="dark"
          blurAmount={20} />}
        <View style={{ position: "absolute", top: 38, left: 0, height: 200, right: 0, alignItems: "center", justifyContent: "center" }}>
          <Image style={{ height: 120, width: 90, resizeMode: "cover" }}
            source={{ uri: 'http://192.168.1.101:3000' + info.imageUrl }} />
          <Text style={{ color: "#fff", marginTop: 8, fontSize: 20, fontWeight: "600" }}>{info.name}</Text>
          <Text style={{ color: "#fff", marginTop: 6, fontSize: 12 }}>{info.author} | {info.type} | {info.count}</Text>
        </View>
        {/* <View style={styles.division}></View> */}
        {/* <View style={{ backgroundColor: "#fff", height: 1000 }}></View> */}
        {this._renderDesc()}
        <View style={styles.division}></View>
        {this._renderChapter()}
        <View style={styles.division}></View>
        {this._renderComment()}
        <View style={styles.division}></View>
        {this._renderAlike()}
        <View style={styles.division}></View>
        {this._renderLove()}
        <View style={styles.division}></View>
      </ScrollView>
    )
  }

  renderBottom = () => {
    return (
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.collectBtn} onPress={this._collect}>
          <Image style={styles.icon} source={{ uri: images.plusIcon }}></Image>
          <Text style={styles.text}>收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.readBtn} onPress={this._read}>
          <Text style={styles.readText}>开始阅读</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downBtn}>
          <Image style={styles.icon} source={{ uri: images.downLoad }}></Image>
          <Text style={styles.text}>下载</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderPage() {
    const { loadding, info, bgColor, opacity } = this.state;

    const contanier = {
      backgroundColor: "#fff",
      flex: 1,
      justifyContent: loadding ? "center" : "flex-start"
    }

    return (
      <View style={contanier}>
        <View style={{ position: "absolute", alignItems: "center", height: 64, top: 0, left: 0, right: 0, zIndex: 9999999, backgroundColor: `rgba(225,89,85, ${opacity})` }}>
          <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", height: 44, top: 20, left: 0, right: 0 }}>
            <View style={{ position: "absolute", justifyContent: "center", height: 44, top: 0, left: 12, right: 0 }}>
              <TouchableOpacity style={{ hitSlop: { top: 12, bottom: 12, left: 8, right: 8 } }} onPress={this._onPressButton}>
                <Image style={{ tintColor: "#fff", width: 16, height: 16 }} source={{ uri: images.backIcon }} />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "#fff", fontSize: 18, color: `brgba(225,225,225, ${opacity})` }}>{this.props.title}</Text>
          </View>
        </View>
        {(loadding && !this.state.viewRef) ? this.renderLoading() : this.renderContent()}
        {!(loadding && !this.state.viewRef) && this.renderBottom()}
      </View>
    );
  }
}

const styles = {
  bottom: {
    position: "absolute",
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: "#f4f4f4",
    borderStyle: "solid"
  },
  downBtn: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  collectBtn: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  readBtn: {
    flex: 1,
    backgroundColor: "#e15955",
    justifyContent: "center",
    alignItems: "center"
  },
  readText: {
    color: "#fff",
    fontSize: 18
  },
  icon: {
    width: 22,
    height: 22
  },
  text: {
    color: "#e15955",
    fontSize: 18
  },
  division: {
    height: 10,
    backgroundColor: "#f4f4f4"
  },
  box: {
    backgroundColor: "#fff",
  },
  boxText: {
    color: "rgba(0,0,0,0.75)"
  },
  boxTitle: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#f4f4f4",
    fontSize: 18
  },
  boxContent: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16
  },
  chpaterBox: {
    flex: 1,
    backgroundColor: "#fff",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  chpaterName: {
    fontSize: 16
  },
  chpaterCount: {
    color: "rgba(0,0,0,0.4)"
  },
  rightBox: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  leftIcon: {
    width: 16,
    height: 16
  }
}