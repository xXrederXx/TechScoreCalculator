import PartDisplay from '@/components/PartDisplay';
import { CalculateCPUScores, ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { CalculateSSDScores, ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import { CalculateRAMScores, ConvertToRAM } from '@/Lib/Converters/GHToRAM';
import { theme } from '@/Lib/theme';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
        <PartDisplay PartName={"CPU"} convertFunc={(d, p) => ConvertToCPU(d, p)} scoreFunc={(d) => CalculateCPUScores(d)} />
        <PartDisplay PartName={"SSD"} convertFunc={(d, p) => ConvertToSSD(d, p)} scoreFunc={(d) => CalculateSSDScores(d)} />
        <PartDisplay PartName={"RAM"} convertFunc={(d, p) => ConvertToRAM(d, p)} scoreFunc={(d) => CalculateRAMScores(d)} />
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
