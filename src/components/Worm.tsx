import {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {Coordinate} from '../types/types';
import {View} from 'react-native';
import {Colors} from '../styles/colors';

interface WormProps {
  worm: Coordinate[];
}

export default function Worm({worm}: WormProps): JSX.Element {
  return (
    <Fragment>
      {worm.map((coordinate: Coordinate, index: number) => {
        const coordinateStyle = {
          left: coordinate.x * 10,
          top: coordinate.y * 10,
        };
        return <View key={index} style={[styles.worm, coordinateStyle]} />;
      })}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  worm: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
});
