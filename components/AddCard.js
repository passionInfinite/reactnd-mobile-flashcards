import React from 'react'
import { Text, TextInput, View, StyleSheet } from "react-native";
import Button from "./shared/Button";
import COLORS from "../utils/colors";
import { addCardToStorage } from "../actions/index";
import { connect } from 'react-redux'

class AddCard extends React.Component
{
  static navigationOptions = ({navigation}) => ({
    title: `Save card in ${navigation.state.params.deck.title} deck`
  })

  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this)
    this.addCard = this.addCard.bind(this)
  }

  addCard() {
    const { addCard, navigation } = this.props
    const deck = navigation.state.params.deck.title
    addCard(deck, this.state)
    this.setState({
      question: '',
      answer: ''
    })
  }

  handleChangeQuestion(question) {
    this.setState({
      question: question
    })
  }

  handleChangeAnswer(answer) {
    this.setState({
      answer: answer
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Question: </Text>
          <TextInput style={styles.inputText} placeholder="Enter your question here!" value={this.state.question} onChangeText={this.handleChangeQuestion} />
          <Text style={styles.label}>Answer: </Text>
          <TextInput style={styles.inputText} placeholder="Enter your answer here!" value={this.state.answer} onChangeText={this.handleChangeAnswer}/>
          <Button title="Save Card" onPress={this.addCard} style={{padding: 20, marginBottom: 20}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.WHITE
  },
  label: {
    fontSize: 18,
    color: 'black',
    padding: 5,
    textAlign: 'left'
  },
  inputText: {
    height: 50,
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 20
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addCard: (deck, card) => dispatch(addCardToStorage(deck, card))
  }
}

export default connect(null, mapDispatchToProps)(AddCard)