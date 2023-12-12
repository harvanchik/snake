import 'react-native-gesture-handler';
import Game from './src/components/Game';
import About from './src/components/About';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; // Import the createStackNavigator

const Stack = createStackNavigator(); // Create a Stack navigator

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
