import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GeizhalsInput from '../GeizhalsInput';
import { theme } from '@/Lib/theme';

interface NamedGHInputProps {
    onUrlChanged: (url: string) => void,
    name: string
}

const NamedGHInput = (props: NamedGHInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text]}>{props.name}</Text>
            <View style={styles.inp}>
                <GeizhalsInput onUrlChange={props.onUrlChanged} />
            </View>
        </View>
    );
};

export default NamedGHInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: theme.spacing.md,
    },
    text: {
        flex: 1,
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.text.light,
        alignSelf: "center",
    },
    inp: {
        flex: 3,
    }
});
