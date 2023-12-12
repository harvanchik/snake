import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {Colors} from '../styles/colors';

interface HeaderProps {
  restartGame: () => void;
  pauseGame: () => void;
  goToAbout: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export default function Header({
  children,
  restartGame,
  pauseGame,
  goToAbout,
  isPaused,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={restartGame}>
        <Text>RESTART</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pauseGame}>
        <Text>{isPaused ? 'PLAY' : 'PAUSE'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToAbout}>
        <Text>ABOUT</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
