import PartDisplay from '@/components/PartCheckerOnly/PartDisplay';
import { ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PartCheckerScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PartDisplay PartName={"CPU"} convertFunc={(d) => ConvertToCPU(d)}/>
      <PartDisplay PartName={"SSD"} convertFunc={(d) => ConvertToSSD(d)}/>
      <PartDisplay/>
      <PartDisplay/>
      <Text style={styles.text}>Part Checker Screen</Text>
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
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default PartCheckerScreen;
