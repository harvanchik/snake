import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from '../styles/colors';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Coordinate, Direction, GestureEventType} from '../types/types';
import Worm from './Worm';
import {checkGameOver} from '../utils/checkGameOver';
import Predator from './Predator';
import {checkEatsPredator} from '../utils/checkEatPredator';
import {randomPredatorPosition} from '../utils/randomPredatorPosition';

const WORM_INITIAL_POSITION = [{x: 5, y: 5}];
const GAME_BOUNDS = {minX: 0, maxX: 35, minY: 0, maxY: 71};
const PREDATOR_INITIAL_POSITION = randomPredatorPosition(
  GAME_BOUNDS.maxX,
  GAME_BOUNDS.maxY,
);
const MOVE_INTERVAL = 50;

export default function Game(): JSX.Element {
  const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT);
  const [worm, setWorm] = React.useState<Coordinate[]>(WORM_INITIAL_POSITION);
  const [predator, setPredator] = React.useState<Coordinate>(
    PREDATOR_INITIAL_POSITION,
  );
  const [isGameOver, setGameOver] = React.useState<boolean>(false);
  const [isPaused, setPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveWorm();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [worm, isGameOver, isPaused]);

  const moveWorm = () => {
    const wormHead = worm[0];
    const newHead = {...wormHead};

    // game over
    if (checkGameOver(wormHead, GAME_BOUNDS)) {
      setGameOver(prev => !prev);
      // stop here
      return;
    }

    switch (direction) {
      case Direction.UP:
        newHead.y -= 1;
        break;
      case Direction.DOWN:
        newHead.y += 1;
        break;
      case Direction.LEFT:
        newHead.x -= 1;
        break;
      case Direction.RIGHT:
        newHead.x += 1;
        break;
      default:
        break;
    }

    // if worm eats predator
    if (checkEatsPredator(newHead, predator, 2)) {
      // create new predator
      setPredator(randomPredatorPosition(GAME_BOUNDS.maxX, GAME_BOUNDS.maxY));

      setWorm([newHead, ...worm]);

      // increase score
      setScore(score + 1);
    } else {
      setWorm([newHead, ...worm.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;
    console.log(translationX, translationY);

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // right swipe
        setDirection(Direction.RIGHT);
      } else {
        // left swipe
        setDirection(Direction.LEFT);
      }
    } else {
      if (translationY > 0) {
        // down swipe
        setDirection(Direction.DOWN);
      } else {
        // up swipe
        setDirection(Direction.UP);
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boundaries}>
          <Worm worm={worm} />
          <Predator x={predator.x} y={predator.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
