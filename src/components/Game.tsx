import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from '../styles/colors';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Coordinate, Direction, GestureEventType, Quote} from '../types/types';
import Worm from './Worm';
import {checkGameOver} from '../utils/checkGameOver';
import Predator from './Predator';
import {checkEatsPredator} from '../utils/checkEatPredator';
import {randomPredatorPosition} from '../utils/randomPredatorPosition';
import {Text} from 'react-native';
import Header from './Header';
import {getRandomQuote} from '../utils/getRandomQuote';

const WORM_INITIAL_POSITION = [{x: 5, y: 5}];
const GAME_BOUNDS = {minX: 0, maxX: 35, minY: 0, maxY: 59};
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
  const [highScore, setHighScore] = React.useState<number>(0);
  const [quote, setQuote] = React.useState<Quote>({content: '', author: ''});

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
      // random quote api
      fetchRandomQuote();
      // if score is higher than high score, set high score
      if (score > highScore) {
        setHighScore(score);
      }
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
      // update high score if needed
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    } else {
      setWorm([newHead, ...worm.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;

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

  const restartGame = () => {
    setWorm(WORM_INITIAL_POSITION);
    setPredator(randomPredatorPosition(GAME_BOUNDS.maxX, GAME_BOUNDS.maxY));
    setDirection(Direction.RIGHT);
    setGameOver(false);
    setScore(0);
    setPaused(false);
  };

  const pauseGame = () => {
    setPaused(!isPaused);
  };

  const fetchRandomQuote = async () => {
    try {
      const randomQuote = await getRandomQuote();
      setQuote(randomQuote);
    } catch (error) {
      // Handle the error as needed
      console.error('Error in component:', error);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          restartGame={restartGame}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.primary,
            }}>
            {score} | H: {highScore}
          </Text>
        </Header>
        <View style={styles.boundaries}>
          <Worm worm={worm} />
          <Predator x={predator.x} y={predator.y} />
          {/* show game over title in middle of screen is game is over */}
          {isGameOver && (
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 50,
                fontWeight: 'bold',
                color: Colors.primary,
              }}>
              GAME OVER
            </Text>
          )}

          {isGameOver && (
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.secondary,
              }}>
              "{quote.content}" - {quote.author}
            </Text>
          )}
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
