import NamedGHInput from '@/components/PcCheckerOnly/NamedGHInput';
import { ConvertToCase } from '@/Lib/Converters/GHToCase';
import { ConvertToCPU } from '@/Lib/Converters/GHToCPU';
import { ConvertToCPUCooler } from '@/Lib/Converters/GHToCPUCooler';
import { ConvertToGPU } from '@/Lib/Converters/GHToGPU';
import { ConvertToMotherboard } from '@/Lib/Converters/GHToMotherboard';
import { ConvertToPSU } from '@/Lib/Converters/GHToPSU';
import { ConvertToRAM } from '@/Lib/Converters/GHToRAM';
import { ConvertToSSD } from '@/Lib/Converters/GHToSSD';
import { fetchDataGeizhals, fetchPriceGeizhals } from '@/Lib/DataFetcher';
import { PreStyle, theme } from '@/Lib/theme';
import { defaultPcSpecs, PCSpecs, Price } from '@/Lib/Types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PcCheckerScreen: React.FC = () => {
  const [specs, setSpecs] = useState<PCSpecs>(defaultPcSpecs)

  async function getData(url: string, setFunc: (data: any, p: Price) => void) {
    let response = await fetchDataGeizhals(url)
    let price = await fetchPriceGeizhals(url)
    if (response) {
      setFunc(response, price)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, CPU: ConvertToCPU(d, p), }));
          })}
          name="CPU"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, GPU: ConvertToGPU(d, p), }));
          })}
          name="GPU"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, RAM: ConvertToRAM(d, p), }));
          })}
          name="RAM"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, SSD: ConvertToSSD(d, p), }));
          })}
          name="SSD"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, Motherboard: ConvertToMotherboard(d, p), }));
          })}
          name="Motherboard"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, PSU: ConvertToPSU(d, p), }));
          })}
          name="PSU"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, Case: ConvertToCase(d, p), }));
          })}
          name="Case"
        />
        <NamedGHInput
          onUrlChanged={(u) => getData(u, (d, p) => {
            setSpecs((prevSpecs) => ({ ...prevSpecs, CPUCooler: ConvertToCPUCooler(d, p), }));
          })}
          name="CPU Cooler"
        />
      </View>
      <View style={styles.subContainer}>
        {/* <ScrollView>
          <Text style={PreStyle.text}>{JSON.stringify(specs, null, 4)}</Text>
        </ScrollView> */}
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
