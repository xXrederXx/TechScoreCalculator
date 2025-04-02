import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import GeizhalsInput from '../GeizhalsInput';

const PartDisplay = () => {
    function getData() {
        // This will fetch data as JSON key-value pairs
        console.log("Fetching data...");
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Geizhals Product Lookup</Text>
            <GeizhalsInput />
            <Button title="Fetch Data" onPress={getData} color="#007BFF" />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
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
