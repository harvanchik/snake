// About.tsx
import * as React from 'react';
import {View, Text, Linking, Button} from 'react-native';

export default function About() {
  const handlePress = () => {
    Linking.openURL('https://github.com/harvanchik/snake');
  };

  return (
    <View>
      <Text>Jake Harvanchik</Text>
      <Button title="Go to GitHub Repo" onPress={handlePress} />
    </View>
  );
}
