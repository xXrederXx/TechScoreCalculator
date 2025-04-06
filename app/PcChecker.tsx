import {PreStyle, theme} from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const PcCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={PreStyle.text}>Pc Checker Screen</Text>
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

export default PcCheckerScreen;
