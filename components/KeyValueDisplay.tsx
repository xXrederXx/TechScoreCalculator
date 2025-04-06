import { theme } from '@/Lib/theme';
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
    container: {
        width: '100%',
        height: "100%"
    },
    dataContainer: {
        marginTop: 15,
        maxHeight: 380,
        width: '100%',
        height: "100%",
        flex: 1
    },
    dataItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background.verylight,
        padding: theme.spacing.xs,
        marginBottom: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        gap: theme.spacing.lg,
    },
    keyText: {
        fontWeight: 'bold',
        color: theme.colors.text.light,
    },
    valueText: {
        color: theme.colors.text.normal,
        flexShrink: 1,
        textAlign: "right"
    }
});
