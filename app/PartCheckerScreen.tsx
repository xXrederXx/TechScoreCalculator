import PartDisplay from '@/components/PartCheckerOnly/PartDisplay';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PartDisplay/>
      <Text style={styles.text}>Part Checker Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default PartCheckerScreen;
