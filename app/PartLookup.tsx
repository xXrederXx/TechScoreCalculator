import PartDisplay from '@/components/PartDisplay';
import { CalculateCPUScores, ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { CalculateSSDScores, ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import { CalculateRAMScores, ConvertToRAM } from '@/Lib/Converters/GHToRAM';
import { theme } from '@/Lib/theme';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ConvertToGPU } from '@/Lib/Converters/GHToGPU';
import { ConvertToMotherboard } from '@/Lib/Converters/GHToMotherboard';
import { ConvertToPSU } from '@/Lib/Converters/GHToPSU';
import { ConvertToCase } from '@/Lib/Converters/GHToCase';
import { ConvertToCPUCooler } from '@/Lib/Converters/GHToCPUCooler';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainerStyle}>
        <PartDisplay PartName={"CPU"} convertFunc={(d, p) => ConvertToCPU(d, p)} scoreFunc={(d) => CalculateCPUScores(d)} />
        <PartDisplay PartName={"SSD"} convertFunc={(d, p) => ConvertToSSD(d, p)} scoreFunc={(d) => CalculateSSDScores(d)} />
        <PartDisplay PartName={"RAM"} convertFunc={(d, p) => ConvertToRAM(d, p)} scoreFunc={(d) => CalculateRAMScores(d)} />
        <PartDisplay PartName={"GPU"} convertFunc={(d, p) => ConvertToGPU(d, p)} scoreFunc={(d) => "Not Scorable"} />
        <PartDisplay PartName={"Motherboard"} convertFunc={(d, p) => ConvertToMotherboard(d, p)} scoreFunc={(d) => "Not Scorable"} />
        <PartDisplay PartName={"PSU"} convertFunc={(d, p) => ConvertToPSU(d, p)} scoreFunc={(d) => "Not Scorable"} />
        <PartDisplay PartName={"Case"} convertFunc={(d, p) => ConvertToCase(d, p)} scoreFunc={(d) => "Not Scorable"} />
        <PartDisplay PartName={"CPU Cooler"} convertFunc={(d, p) => ConvertToCPUCooler(d, p)} scoreFunc={(d) => "Not Scorable"} />
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
