import React from 'react'
import { Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import Button from './shared/Button'
import {addDeck, addDeckToStorage} from "../actions/index";
import { connect } from 'react-redux'

class NewDeck extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      newDeck : ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.createDeck = this.createDeck.bind(this)
  }
  createDeck = () => {
    const { newDeck } = this.state
    const { addDeck, navigation } = this.props
    this.setState({
      newDeck: ''
    })
    addDeck(newDeck);
    navigation.navigate("DeckDetail", {deck: {title: newDeck}})
  }
  handleChangeText (text) {
    this.setState({
      newDeck: text
    })
  }
  render () {
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
          <Text style={styles.headerText}>What is the title of your new deck?</Text>
          <TextInput style={styles.inputText}
                     placeholder="Type title here!"
                     onChangeText={this.handleChangeText}
                     value={this.state.newDeck}
          />
          <Button title="Create Deck" onPress={this.createDeck} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputText: {
    height: 50,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  headerText: {
    fontSize: 32,
    padding: 20,
    textAlign: 'center'
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (newDeck) => dispatch(addDeckToStorage({
      newDeck
    }))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)