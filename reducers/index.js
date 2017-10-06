import ACTIONS from '../actions/constants'

export default function decks(state = {}, action) {
  switch (action.type) {
    case ACTIONS.ADD_DECK:
      return {
        ...state,
        [action.newDeck] : {
          title: action.newDeck,
          questions: []
        }
      }
    case ACTIONS.GET_DECKS:
      return JSON.parse(action.decks)
    case ACTIONS.ADD_CARD:
      return {
        ...state,
        [action.deck] : {
          ...state[action.deck],
          questions: state[action.deck].questions.concat(action.card)
        }
      }
    default:
      return state
  }
}