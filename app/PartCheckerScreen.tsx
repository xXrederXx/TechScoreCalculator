import PartDisplay from '@/components/PartCheckerOnly/PartDisplay';
import { ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import theme from '@/Lib/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PartDisplay PartName={"CPU"} convertFunc={(d) => ConvertToCPU(d)}/>
      <PartDisplay PartName={"SSD"} convertFunc={(d) => ConvertToSSD(d)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.normal,
  },
  text: {
    color: theme.colors.text.normal,
    fontSize: 24,
  },
});

export default PartCheckerScreen;
