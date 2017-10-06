import { TabNavigator } from 'react-navigation'
import COLORS from "../utils/colors";
import { FontAwesome } from '@expo/vector-icons'
import NewDeck from "./NewDeck";
import DeckList from "./DeckList";

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: () => <FontAwesome name="th-lists" size={30} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: () => <FontAwesome name="plus" size={30} />
    }
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: COLORS.WHITE,
    activeBackgroundColor: COLORS.PURPLE,
    style: {
      backgroundColor: COLORS.PURPLE
    }
  }
}, {
  navigationOptions: {
    header: null
  },
})

export default Tabs