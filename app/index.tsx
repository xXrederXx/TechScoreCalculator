import React from 'react';
import { View, StyleSheet } from 'react-native';
import Hero from '@/components/IndexOnly/Hero';
import NavigationSection from '@/components/IndexOnly/NavigationSection';
import { PreStyle, theme } from '@/Lib/theme';

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
    color: theme.colors.text.normal,
    ...PreStyle.container
  },
});

export default HomeScreen;
