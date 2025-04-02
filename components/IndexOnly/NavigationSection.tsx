import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Href, router } from 'expo-router';

const NavigationSection = () => {
  function GoTo(name:Href)
  {
    router.push(name);
  }
  return (
    <View style={styles.navContainer}>
      {['PcChecker', 'PartChecker', 'PcScore'].map((screen) => (
        <TouchableOpacity
          key={screen}
          style={styles.button}
          onPress={() => GoTo((screen + "Screen") as Href)}
        >
          <Text style={styles.buttonText}>{screen}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default NavigationSection;
