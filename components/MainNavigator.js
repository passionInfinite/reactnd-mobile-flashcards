import React from 'react'
import { StackNavigator } from 'react-navigation'
import Tabs from "./Tabs";
import DeckDetail from "./DeckDetail";
import COLORS from "../utils/colors";
import AddCard from "./AddCard";
import QuizView from "./QuizView";


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions:{
      headerTintColor: COLORS.WHITE,
      headerStyle: {
        backgroundColor: COLORS.PURPLE
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions:{
      headerTintColor: COLORS.WHITE,
      headerStyle: {
        backgroundColor: COLORS.PURPLE
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: COLORS.WHITE,
      headerStyle: {
        backgroundColor: COLORS.PURPLE
      }
    }
  }
})

export default MainNavigator