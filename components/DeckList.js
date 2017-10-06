import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import COLORS from "../utils/colors";
import { connect } from 'react-redux'
import { getDecksFromStorage } from "../actions/index";
import Button from "./shared/Button";

class DeckList extends React.Component
{
  constructor(props) {
    super(props)
    this.goToCreateDeck = this.goToCreateDeck.bind(this)
  }
  componentDidMount() {
    const { getDecks } = this.props
    getDecks()
  }
  goToCreateDeck() {
    const {navigation} = this.props
    navigation.navigate("NewDeck")
  }
  render () {
    const {decks} = this.props
    return (
      <ScrollView>
        {decks !== null ? Object.keys(decks).map(deck => (
          <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate(
            'DeckDetail',
            {deck: {title: deck}}
          )} key={deck} >
            <View>
              <Text style={styles.headerText}>{decks[deck].title}</Text>
              <Text style={styles.cardText}>{decks[deck].questions.length} cards</Text>
            </View>
          </TouchableOpacity>
          )) :
          <TouchableOpacity>
            <View>
              <Text style={styles.headerText}>You haven't made any deck!</Text>
              <Button title="Create Deck Here!" onPress={this.goToCreateDeck} />
            </View>
          </TouchableOpacity>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    padding: 30,
    marginBottom: 10,
    justifyContent: 'center'
  },
  headerText: {
    padding: 20,
    fontSize: 30,
    textAlign: 'center'
  },
  cardText: {
    paddingBottom: 20,
    fontSize: 20,
    color: COLORS.MUTED,
    textAlign: 'center'
  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDecks: () => dispatch(getDecksFromStorage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)