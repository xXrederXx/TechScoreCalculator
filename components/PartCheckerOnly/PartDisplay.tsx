import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import GeizhalsInput from '@/components/GeizhalsInput';
import { fetchDataGeizhals } from '@/Lib/DataFetcher';
import KeyValueDisplay from '../KeyValueDisplay';
import { ConvertToCPU } from '@/Lib/Converters/GHToCPU';

const PartDisplay = () => {
    const [url, seturl] = useState("")
    const [scrapedData, setScrapedData] = useState({})

    async function getData() {
        const response = await fetchDataGeizhals(url)
        setScrapedData(response)
        console.log(response);
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Geizhals Product Lookup</Text>
            <GeizhalsInput onUrlChange={(val) => seturl(val)}/>
            <Button title="Fetch Data" onPress={getData} color="#007BFF" />
            <KeyValueDisplay data={ConvertToCPU(scrapedData)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    }
});

export default PartDisplay;
