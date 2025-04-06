import NamedGHInput from '@/components/PcCheckerOnly/NamedGHInput';
import { fetchDataGeizhals } from '@/Lib/DataFetcher';
import { PreStyle, theme } from '@/Lib/theme';
import { PCSpecs } from '@/Lib/Types';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const PcCheckerScreen: React.FC = () => {
  const [specs, setSpecs] = useState<any>({})

  async function getData(url : string, setFunc: (data:any) => void) {
    let response = await fetchDataGeizhals(url)
    if(response)
    {
      setFunc(response)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.CPU = d)})} name='CPU' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.GPU = d)})} name='GPU' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.RAM = d)})} name='RAM' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.SSD = d)})} name='SSD' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.Motherboard = d)})} name='Motherboard' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.PSU = d)})} name='PSU' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.Case = d)})} name='Case' />
        <NamedGHInput onUrlChanged={(u) => getData(u, (d) => { setSpecs(specs.CPUCooler = d)})} name='CPU Cooler' />
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
