import PartDisplay from '@/components/PartCheckerOnly/PartDisplay';
import { CalculateCPUScores, ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { CalculateSSDScores, ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import { PreStyle, theme } from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
        <PartDisplay PartName={"CPU"} convertFunc={(d) => ConvertToCPU(d)} scoreFunc={(d) => CalculateCPUScores(d)} />
        <PartDisplay PartName={"SSD"} convertFunc={(d) => ConvertToSSD(d)} scoreFunc={(d) => CalculateSSDScores(d)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.normal,
    width: "100%",
    height: "100%",
  },
  text: {
    color: theme.colors.text.normal,
    fontSize: 24,
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  contentContainerStyle : {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default PartCheckerScreen;
