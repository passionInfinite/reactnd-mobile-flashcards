import React from 'react'
import {Text, View, StyleSheet} from "react-native";
import Button from "./shared/Button";
import COLORS from "../utils/colors";
import { connect } from 'react-redux'

class DeckDetail extends React.Component
{
  constructor(props) {
    super(props)
    this.goToAddCard = this.goToAddCard.bind(this)
    this.goToQuiz = this.goToQuiz.bind(this)
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.deck.title
  })

  goToAddCard () {
    const { navigation, deck } = this.props
    navigation.navigate("AddCard", {deck: deck})
  }
  goToQuiz () {
    const { navigation, deck } = this.props
    navigation.navigate("QuizView", {deck: deck})
  }
  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.headerText}>{deck.title}</Text>
        <Text style={styles.cardText}> {deck.questions.length} cards </Text>
        <Button title="Add Cards" onPress={this.goToAddCard} style={styles.addCardBtn} textColor={{color: 'black'}} />
        <Button title="Start Quiz" onPress={this.goToQuiz} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: COLORS.WHITE
  },
  headerText: {
    fontSize: 40,
    padding: 20,
    paddingBottom: 0,
    textAlign: 'center'
  },
  cardText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    marginBottom: 20,
    color: COLORS.MUTED
  },
  addCardBtn: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.PURPLE,
    borderWidth: 2,
    marginBottom: 20
  }
})

function mapStateToProps(state, props) {
  const deck = props.navigation.state.params
  if ( typeof deck === 'object') {
    return {
      deck: state[deck.deck.title]
    }
  } else {
    return {
      deck: state[deck]
    }
  }
}

export default connect(mapStateToProps)(DeckDetail)