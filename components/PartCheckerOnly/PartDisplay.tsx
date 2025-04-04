import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import GeizhalsInput from '@/components/GeizhalsInput';
import { fetchDataGeizhals } from '@/Lib/DataFetcher';
import KeyValueDisplay from '../KeyValueDisplay';
import { NamedValue } from '@/Lib/Types';
import theme from '@/Lib/theme';

interface PartDisplayProps {
    PartName?: string,
    convertFunc?: (data: any) => any,
}

const PartDisplay = (props: PartDisplayProps) => {
    const [url, seturl] = useState("")
    const [scrapedData, setScrapedData] = useState<{ value: NamedValue<any> }>({ value: new NamedValue(0, "") })

    async function getData() {
        let response = await fetchDataGeizhals(url)
        try {
            if (props.convertFunc) {
                response = props.convertFunc(response);
                console.log(response);
            }
        } catch (err) {
            console.log("Convertion func not working. Error: " + err);
        }
        setScrapedData(response)
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Geizhals {props.PartName} Lookup</Text>
            <GeizhalsInput onUrlChange={(val) => seturl(val)} />
            <TouchableOpacity style={styles.buttonStyle} onPress={getData}>
                <Text style={styles.buttonText}>Fetch</Text>
            </TouchableOpacity>
            <KeyValueDisplay data={scrapedData} />
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: theme.colors.background.light,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        minWidth: 330,
        maxWidth: 660
    },
    buttonStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 21,
        width: 200,
        height: 30,
        borderRadius: 12,
        backgroundColor: theme.colors.primary.normal
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text.verylight,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: theme.colors.text.verylight,
    }
});

export default PartDisplay;
