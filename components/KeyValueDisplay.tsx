import { NamedValue } from '@/Lib/Types';
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

interface KeyValueDisplayProps {
    data: { value: NamedValue<any> }
}

const KeyValueDisplay = (props: KeyValueDisplayProps) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.dataContainer}>
                {Object.entries(props.data).map(([key, value], index) => (
                    <View key={index} style={styles.dataItem}>
                        <Text style={styles.keyText}>{key}:</Text>
                        <Text style={styles.valueText}>{value.UserVersion}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default KeyValueDisplay;

const styles = StyleSheet.create({
    container: {},
    dataContainer: {
        marginTop: 15,
        maxHeight: 300,
        width: '100%',
    },
    dataItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 8,
        marginBottom: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        gap: 12
    },
    keyText: {
        fontWeight: 'bold',
        color: '#333',
    },
    valueText: {
        color: '#555',
        flexShrink: 1,
    }
});
