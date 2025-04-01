import React from 'react';
import { View, StyleSheet } from 'react-native';
import Hero from '../components/Hero';
import NavigationSection from '../components/NavigationSection';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Hero />
      <NavigationSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
});

export default HomeScreen;
