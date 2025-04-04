import React from 'react';
import { View, StyleSheet } from 'react-native';
import Hero from '@/components/IndexOnly/Hero';
import NavigationSection from '@/components/IndexOnly/NavigationSection';
import theme from '@/Lib/theme';

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
    backgroundColor: theme.colors.background.normal,
    color: theme.colors.text.normal,
    padding: 20,
  },
});

export default HomeScreen;
