import NamedGHInput from '@/components/PcCheckerOnly/NamedGHInput';
import { PreStyle, theme } from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const PcCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <NamedGHInput onUrlChanged={() => {}} name='CPU'/>
        <NamedGHInput onUrlChanged={() => {}} name='SSD'/>
        <NamedGHInput onUrlChanged={() => {}} name='RAM'/>
      </View>
      <View style={styles.subContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    gap: theme.spacing.md,
    ...PreStyle.container
  },
  subContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    maxWidth: 700,
    minWidth: 360,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary.normal
  }
});

export default PcCheckerScreen;
