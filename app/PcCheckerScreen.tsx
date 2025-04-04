import theme from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PcCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pc Checker Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.normal,

  },
  text: {
    color: theme.colors.text.normal,
    fontSize: 24,
  },
});

export default PcCheckerScreen;
