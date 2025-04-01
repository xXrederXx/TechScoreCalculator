import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Hero = () => {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.heroText}>Welcome to PC Checker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Hero;
