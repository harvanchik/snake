import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '../styles/colors';

export default function Game(): JSX.Element {
  return <SafeAreaView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
