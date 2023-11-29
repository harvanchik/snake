import {StyleSheet, Text} from 'react-native';
import {Coordinate} from '../types/types';

function getRandomPredatorEmoji() {
  // predators that eat worms (e.g., birds, frogs, etc.)
  const predatorEmojis = [
    '🐸',
    '🦇',
    '🦃',
    '🐔',
    '🐧',
    '🐦',
    '🐤',
    '🐥',
    '🦆',
    '🦅',
    '🦉',
  ];
  return predatorEmojis[Math.floor(Math.random() * predatorEmojis.length)];
}

export default function Predator({x, y}: Coordinate): JSX.Element {
  return (
    <Text style={[styles.predator, {left: x * 10, top: y * 10}]}>
      {getRandomPredatorEmoji()}
    </Text>
  );
}

const styles = StyleSheet.create({
  predator: {
    width: 40,
    height: 40,
    borderRadius: 7,
    position: 'absolute',
  },
});
