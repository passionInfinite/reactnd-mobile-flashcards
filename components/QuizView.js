import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Button from "./shared/Button"
import COLORS from "../utils/colors"
import { connect } from 'react-redux'
import {clearNotification, setNotification} from "../actions/index";

class QuizView extends React.Component
{
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.deck.title + ' Quiz'
  })

  constructor(props) {
    super(props)
    const { deck } = this.props
    this.state = {
      totalCards: deck.questions.length,
      currentCard: 0,
      totalCorrect: 0,
      showAnswer: false,
      quizCompleted: false
    }
    this.showAnswer = this.showAnswer.bind(this)
    this.correct = this.correct.bind(this)
    this.incorrect = this.incorrect.bind(this)
  }

  showAnswer () {
    this.setState((prevState) => ({
      showAnswer: !prevState.showAnswer
    }))
  }

  correct () {
    const { currentCard, totalCards } = this.state
    this.setState((prevState) => ({
      totalCorrect: prevState.totalCorrect + 1,
      currentCard : prevState.currentCard + 1
    }))

    if ((currentCard + 1) === totalCards) {
      this.setState((prevState) => ({
        quizCompleted: true,
        currentCard: 0
      }))
      clearNotification().then(setNotification)
    }
  }

  incorrect () {
    const { currentCard, totalCards } = this.state
    if (this.state.totalCorrect >= 0) {
      this.setState((prevState) => ({
        currentCard : prevState.currentCard + 1
      }))
    }

    if ((currentCard + 1) === totalCards) {
      this.setState((prevState) => ({
        quizCompleted: true,
        currentCard: 0
      }))
      clearNotification().then(setNotification)
    }
  }

  render() {
    const { totalCards, currentCard, showAnswer, quizCompleted, totalCorrect } = this.state
    const { deck, navigation } = this.props
    return (
      <View style={styles.container}>
        { quizCompleted
          ?
            <View>
              <Text style={styles.quizText}>Quiz Completed</Text>
              <Text style={styles.scoreText}>Your Score: {totalCorrect+' out of '+totalCards} </Text>
              <Button title="Back to Decks" onPress={() => navigation.navigate("DeckList")}/>
              <Button title="Restart Quiz" style={{marginTop: 20 }} onPress={() => navigation.navigate("QuizView", { deck : deck })}/>
            </View>
          :
            <View>
              <Text style={{color: COLORS.MUTED, padding: 10, fontSize: 20}}>
                {'Remaining Cards: '+ (totalCards - (currentCard + 1 ))}
              </Text>
              {showAnswer
                ?
                <View>
                <Text style={styles.questionText}>{deck.questions[currentCard].answer}</Text>
                <TouchableOpacity onPress={this.showAnswer}>
                <Text style={styles.answerText}>Question</Text>
                </TouchableOpacity>
                </View>
                :
                <View>
                <Text style={styles.questionText}>{deck.questions[currentCard].question}</Text>
                <TouchableOpacity onPress={this.showAnswer}>
                <Text style={styles.answerText}>Answer</Text>
                </TouchableOpacity>
                </View>
              }

              <Button title="Correct"
              style={{backgroundColor: COLORS.GREEN, marginBottom: 20 }}
              onPress={this.correct}
              />
              <Button title="Incorrect"
              style={{backgroundColor: COLORS.RED, marginBottom: 20 }}
              onPress={this.incorrect}
              />
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 20
  },
  questionText: {
    fontSize: 30,
    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  answerText: {
    fontSize: 24,
    color: COLORS.RED,
    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  quizText: {
    fontSize: 32,
    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  scoreText: {
    fontSize: 24,
    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
})

function mapStateToProps(state, props) {
  const { deck } = props.navigation.state.params
  return {
    deck: state[deck.title]
  }
}
export default connect(mapStateToProps)(QuizView)