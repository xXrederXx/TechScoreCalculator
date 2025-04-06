import {PreStyle, theme} from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PcScoreScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={PreStyle.text}>Pc Score Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    ...PreStyle.container
  },
  text: {
    color: theme.colors.text.normal,
    fontSize: 24,
  },
});

export default PcScoreScreen;
