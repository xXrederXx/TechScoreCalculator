import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const NavigationSection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navContainer}>
      {['PcChecker', 'PartChecker', 'PcScore'].map((screen) => (
        <TouchableOpacity
          key={screen}
          style={styles.button}
          onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
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
