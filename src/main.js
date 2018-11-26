import React, { Component } from "react"
import { View, Text, Image, Alert } from "react-native"
import { Button, TabView, Platform } from "teaset"

import Bag from "./bag/index"
import Books from "./books/index"
import io from 'socket.io-client';

const bagIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAADK0lEQVR4Xu2cTahNURiGn2vETJmYMZAk8lvyEyZ+BgoZMJKUTMXMVJGiDBUlM4MbMqSEiYHfzDBAJgYGBgYo0leHbqt1z9mn++611z69a3pW7/etZ797r3X2Xt+awm3OBKbmrGABDFFgAkM0RAEBgYSdaIgCAgIJO9EQBQQEEnZiJRB3AXuBzcBSYDFUvf58DOwUsPsvMRcnrgKuAluVCRXQqgbifuAWML/AoNUhqoC4D7hX+S07DHznEJcBb4AFansU1Osc4m3gYGbAX4FLwDPgT0Ego0JtA84lnXIQwxzXk35fgCOjAsTv40wsEeh9RvQhcAj41iRg4T4HgDsNIK4FXiX9Pg1WGyNTHgfiaeByovgdWAl8Hhmpmw7VQbwLxKw8s10AznbDp1HU6iC+BNYlqe8B7jcaTjedqoP4IfOMWJ95lnSDKx+1OogfgSVJruHM1zVRS3IxRMHFMURDFBAQSNiJhiggIJCwEw1RQEAgYScaooCAQMJONEQBAYGEnWiIAgICCTvREAUEBBJ2oiEKCAgk7ERDFBAQSNiJhiggIJCwEw1RQEAg0SsnrgG2A4sEA1dKrAAOJ4K5XWHFNjTlPt6fAE4CG5Ujb1mrOogtj7cVeUMUYDXESYcYGz5jc9NvwUDblIgcTyUBOp1YIpdfwHngIvCjzdG3qN05xNg9GyUZfW6dQnwA7O4zvUHunUI8DtwwxOYEcovtLcDTzEN6YXPZ4j2jVCTd3dupE3PbjR8BO4qjaR6wunWiIY5ZUdV047udOOSuMMRZ4IxTlparY4m3Ny8S7StAPKhrbZ3+Y3kObEjIRGFkVJ72vRWbnXO1fTeBY30nOLhzilSZnhnUNM9kFv+bVwPveg6ymBOXA28zsKIu+CjwpMcgi0EMRtODAvEcr7jd43SSnz2EGQXx15K8WykajxiTcAZE02vcGsRIID5Dxow8zvKoaeI19WsVYgy0z+fiNL1QrUOMROKEpjjBY1PTrHrWrwjEf0zipWwcYxAvI+b1DNSwdFs50mWC+GiHMumTg5bWLGqGKMBsiIYoICCQsBMNUUBAIGEnGqKAgEDCThRA/AtQ3TdhBlGz1QAAAABJRU5ErkJggg==';

export default class Main extends Component {

  componentDidMount() {
    // const socket = io('http://localhost:3001');
    // socket.on('connect', function(){});
  }

  render() {
    return (
      <TabView style={{ flex: 1 }} type="projector">
        <TabView.Sheet
          title='书架'
          icon={<Image style={{
            width: 24,
            height: 24
          }} source={require('./images/bag.png')} />}
          activeIcon={require('./images/bag_active.png')}
        >
          <Bag />
        </TabView.Sheet>
        <TabView.Sheet
          title='书城'
          icon={require('./images/bag.png')}
          activeIcon={require('./images/bag_active.png')}
        >
          <Books />
        </TabView.Sheet>
      </TabView>
    )
  }
}
