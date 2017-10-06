import ACTIONS from './constants'
import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from "expo";

const DECK_STORAGE_KEY = 'passionInfinite::decks'
const NOTIFICATION_KEY = 'passionInfinite:notifications'

export function getDecksFromStorage() {
  return function(dispatch) {
    AsyncStorage.getItem(DECK_STORAGE_KEY).then((response) => {
      return dispatch(getDecks(response))
    })
  }
}

export function addDeckToStorage(newDeck) {
  return function (dispatch) {
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[newDeck.newDeck] : {title : newDeck.newDeck, questions: []}}))
      .then(dispatch(addDeck(newDeck)))
  }
}

export function addCardToStorage(deck, card) {
  return function (dispatch) {
    AsyncStorage.getItem(DECK_STORAGE_KEY).then(response => {
      const decks = JSON.parse(response)
      AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[deck]:{questions: decks[deck].questions.concat(card)}})).then((response) => {
        dispatch(addCard(deck,card))
      })
    })
  }
}

export function addDeck(newDeck) {
  return {
    type: ACTIONS.ADD_DECK,
    newDeck: newDeck.newDeck
  }
}

export function getDecks(decks) {
  return {
    type: ACTIONS.GET_DECKS,
    decks: decks
  }
}

export function addCard(deck, card) {
  return {
    type: ACTIONS.ADD_CARD,
    deck: deck,
    card: card
  }
}

// Notifications

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((status) => {
            if (status.status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {time: tomorrow.getTime()}
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            } else {
              console.log(status)
            }
          })
          .catch((error) => {
          console.log(error)
          })
      }
    })
}

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Take a quiz',
    body: "👋 Don't forget to take your quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate:true
    }
  }
}