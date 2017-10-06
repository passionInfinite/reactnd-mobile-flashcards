import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import COLORS from "./utils/colors"
import { Constants } from 'expo'
import { FontAwesome } from '@expo/vector-icons'
import {Provider} from "react-redux"
import { createStore, applyMiddleware} from 'redux'
import reducer  from './reducers/index'
import thunk from 'redux-thunk'
import MainNavigator from './components/MainNavigator'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
      <View style={styles.container}>
        <View style={{ backgroundColor: COLORS.PURPLE, height: Constants.statusBarHeight}}>
          <StatusBar translucent />
        </View>
        <MainNavigator />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREY
  }
})

