import PartDisplay from '@/components/PartCheckerOnly/PartDisplay';
import { CalculateCPUScores, ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { CalculateSSDScores, ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import { PreStyle, theme } from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PartDisplay PartName={"CPU"} convertFunc={(d) => ConvertToCPU(d)} scoreFunc={(d) => CalculateCPUScores(d)} />
      <PartDisplay PartName={"SSD"} convertFunc={(d) => ConvertToSSD(d)} scoreFunc={(d) => CalculateSSDScores(d)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...PreStyle.container
  },
  text: {
    color: theme.colors.text.normal,
    fontSize: 24,
  },
});

export default PartCheckerScreen;
